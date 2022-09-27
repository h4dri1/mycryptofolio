const { User, Wallet, Transaction } = require('../models');
const { UserService } = require('../error/error.services');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt.utils');
const { mailer } = require('../utils');

const { redis } = require('../database')

const { 
    BadPassUser,
    EmailUsed,
    CheckYourPassword,
    CreateUserError,
    ForgotPasswordNoMail,
    SamePasswordAsOld,
    VerifyYourMail,
    NoUserWithThisMail
} = require('../error/error');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = await User.findOne(req.body.email);
            if (!user.id) {
                throw new BadPassUser(req.ip);
            }
            const isPwdValid = await bcrypt.compare(req.body.password, user.password);
            if (!isPwdValid) {
                throw new BadPassUser(req.ip);
            }
            delete user.password;
            const userCurrency = user.currency;
            delete user.currency;
            const token = {
                id: user.id,
            }
            if (!user.verify) {
                throw new VerifyYourMail(req.ip);
            }
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(token));
            return await User.login(user, userCurrency, token)
        } catch (err) {
            throw new UserService(err);
        }
        
    },

    addUser: async (req, res, next) => {
        try {  
            const instance = new User(req.body);   
            const user = await User.findOne(instance.email);
            if (user.id) {
                throw new EmailUsed(req.body.email);
            }
            if (instance.password !== instance.passwordCheck) {
                throw new CheckYourPassword();
            }
            const checkToken = require("crypto").randomBytes(64).toString('hex');
            req.token = checkToken
            instance.password = await bcrypt.hash(instance.password, 10);
            delete instance.passwordCheck;
            const newUser = await instance.save();
            if (newUser) {
                delete newUser.password;
                const response = {
                    "nickname": newUser.nickname,
                    "email": newUser.email,
                };
                await mailer.sendMailCheck(req, res, next);
                await redis.set(checkToken, newUser.id);
                await redis.expire(checkToken, 60*10);
                return new User(response);
            } else {
                throw new CreateUserError();
            }
        } catch (err) {
            throw new UserService(err);
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            const id = await redis.get(req.params.token);
            if (id) {
                const verify = await User.verify(id);
                await redis.del(req.params.token);
                return verify;
            }
        } catch (err) {
            throw new UserService(err);

        }
    },

    resendMail: async (req, res, next) => {
        try {
            const user = await User.findOne(req.params.email);
            if (!user.id) {
                throw new NoUserWithThisMail(req.ip);
            }
            const checkToken = require("crypto").randomBytes(64).toString('hex');
            req.token = checkToken 
            await mailer.sendMailCheck(req, res, next);
            await redis.set(checkToken, user.id);
            await redis.expire(checkToken, 60*10);
            return user;
        } catch (err) {
            throw new UserService(err);

        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = await User.findOne(req.body.email);
            if (!user.id) {
                throw new ForgotPasswordNoMail();
            }
            if (!user.verify) {
                throw new VerifyYourMail(req.ip);
            }
            const token = require("crypto").randomBytes(64).toString('hex');
            req.token = token
            await mailer.sendMail(req, res, next);
            await redis.set(token, user.id);
            await redis.expire(token, 60*10);
            return {message: "Email with instructions sent"};
        } catch (err) {
            throw new UserService(err);

        }
    },

    modifyUser: async (req, res, next) => {
        try {
            const instance = new User(req.body);
            await instance.save();
            return {message: "User modified"};
        } catch (err) {
            throw new UserService(err);

        }
    },

    modifyPassword: async (req, res, next) => {
        try {
            const user = await User.findById(req.userId.id);
            const isPwdValid = await bcrypt.compare(req.body.oldPass, user.password);
            const isPwdSame = await bcrypt.compare(req.body.pass, user.password);
            if (!isPwdValid) {
                throw new BadPassUser(req.ip);
            }
            if (req.body.pass !== req.body.passConfirm || isPwdSame) {
                throw new CheckYourPassword();
            }
            const newHash = await bcrypt.hash(req.body.pass, 10);
            await User.updatePass(newHash, req.userId.id);
            return {"status": "Mot de passe modifié"}
        } catch (err) {
            throw new UserService(err);

        }
    },
    
    modifyPasswordForgot: async (req, res, next) => {
        try {
            const id = await redis.get(req.body.token);
            const user = await User.findById(id);
            const isPwdSame = await bcrypt.compare(req.body.pass, user.password);
            if (isPwdSame) {
                throw new SamePasswordAsOld();
            }
            if (req.body.pass !== req.body.passConfirm) {
                throw new CheckYourPassword();
            } 
            const newHash = await bcrypt.hash(req.body.pass, 10);
            await User.updatePass(newHash, id);
            await redis.del(req.body.token);
            await redis.del(id);
            return {"status": "Mot de passe modifié"};
        } catch (err) {
            throw new UserService(err);

        }
    },

    modifyAvatar: async (req, res, next) => {
        try {
            await User.updateAvatar(req.body.avatar, req.userId.id);
            return {'status': 'Avatar modifié'};
        } catch (err) {
            throw new UserService(err);

        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const wallets = await Wallet.findWalletByUser(req.userId.id);
            for (const wallet of wallets) {
                const transactions = await Transaction.getTransactionByWallet(wallet.id);
                for (const transaction of transactions) {
                    await Transaction.delete(transaction.transaction_id);
                }
                await Wallet.delete(wallet.id);
            }
            await User.deleteOne(req.userId.id);
            return {"status": "Compte supprimé"};
        } catch (err) {
            throw new UserService(err);

        }
    }
}