const { User, Wallet, Transaction } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const mailer = require('../services/mailer');

const { redis } = require('../database')

const { BadPassUser, EmailUsed, CheckYourPassword, CreateUserError, ForgotPasswordNoMail } = require('../error');

module.exports = {
    validLoginJwt: async (req, res, next) => {
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
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(token));
            const response = {
                "status": `(JWT) Bienvenue ${user.nickname}`,
                "refreshToken": jwt.makeRefreshToken(token),
                "id": user.id,
                "nickname": user.nickname,
                "email": user.email,
                "picture": user.picture,
                "currency": userCurrency
            };
            res.status(200).json(response);
        } catch (err) {
            next(err)
        };
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
            instance.password = await bcrypt.hash(instance.password, 10);
            delete instance.passwordCheck;
            const newUser = await instance.save();
            if (newUser) {
                delete newUser.password;
                const token = {id: newUser.id};
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', jwt.makeToken(token));
                const response = {
                    "status": `Bienvenue ${newUser.nickname}`,
                    "refreshToken": jwt.makeRefreshToken(token),
                    "id": newUser.id,
                    "nickname": newUser.nickname,
                    "email": newUser.email,
                    "picture": '',
                    "currency": 'USD'
                };
                return res.status(201).json(response);
            } else {
                throw new CreateUserError();
            }
        } catch (err) {
            next(err);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const user = await User.findOne(req.body.email);
            if (!user.id) {
                throw new ForgotPasswordNoMail();
            }
            const token = require("crypto").randomBytes(64).toString('hex');
            req.token = token
            await mailer.sendMail(req, res, next);
            await redis.set(token, user.id);
            await redis.expire(token, 60*10);
            res.status(201).json({message: "Email with instructions sent"});
        } catch (err) {
            next(err);
        }
    },

    checkToken: async (req, res, next) => {
        try {
           const token = await redis.get(req.params.token);
           if (token) {
            res.status(200)
           } else {
            res.status(204).json()
           }
        } catch (err) {
            next(err);
        }
    },

    modifyUser: async (req, res, next) => {
        try {
            const instance = new User(req.body);
            await instance.save();
            res.status(201).json("Modification effectuée");
        } catch(err) {
            next(err);
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
            return res.status('201').json({"status": "Mot de passe modifié"});
        } catch(err) {
            next(err);
        }
    },

    modifyPasswordForgot: async (req, res, next) => {
        try {
            const id = await redis.get(req.body.token);
            const user = await User.findById(id);
            const isPwdSame = await bcrypt.compare(req.body.pass, user.password);
            if (req.body.pass !== req.body.passConfirm || isPwdSame) {
                throw new CheckYourPassword();
            } 
            const newHash = await bcrypt.hash(req.body.pass, 10);
            await User.updatePass(newHash, id);
            await redis.del(req.body.token);
            await redis.del(id);
            return res.status('201').json({"status": "Mot de passe modifié"});
        } catch(err) {
            next(err);
        }
    },

    modifyAvatar: async (req, res, next) => {
        try {
            await User.updateAvatar(req.body.avatar, req.userId.id);
            return res.status(201).json('Avatar modifié');
        } catch(err) {
            next(err);
        } 
    },

    modifyCurrency: async (req, res, next) => {
        try {
            await User.updateCurrency(req.body.currency, req.userId.id);
            return res.status(201).json({"status": "Devise modifiée"});
        } catch(err) {
            next(err);
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
            return res.status(201).json({"status": "Compte supprimé"});
        } catch(err) {
            next(err);
        }
    }
};