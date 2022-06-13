const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const { BadPassUser, EmailUsed, CheckYourPassword, CreateUserError } = require('../error');

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
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(user));
            const response = {
                "status": `(JWT) Bienvenue ${user.nickname}`,
                "refreshToken": jwt.makeRefreshToken(user),
                "id": user.id
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
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', jwt.makeToken(newUser));
                const response = {
                    "status": `Bienvenue ${newUser.nickname}`,
                    "refreshToken": jwt.makeRefreshToken(newUser)
                };
                return res.status(201).json(response);
            } else {
                throw new CreateUserError();
            }
        } catch (err) {
            next(err);
        }
    },

    modifyUser: async (req, res, next) => {
        try {
            const instance = new User(req.body);
            instance.picture = req.userId.picture;
                await instance.save();
                res.setHeader('Authorization', jwt.makeToken(instance));
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                return res.status(201).json({"refreshToken": jwt.makeRefreshToken(instance)});
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
    }
};