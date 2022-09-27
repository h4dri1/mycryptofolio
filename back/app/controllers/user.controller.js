const { userService } = require('../services');
const { redis } = require('../database');
const jwt = require('../utils/jwt.utils');
const { authUtils } = require('../utils');
const { User } = require('../models')

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = await userService.login(req, res, next);
            res.status(200).json(user);
        } catch (err) {
            next(err)
        };
    },

    addUser: async (req, res, next) => {
        try {
            const user = await userService.addUser(req, res, next);
            res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    },

    verifyEmail: async (req, res, next) => {
        try {
            const verify = await userService.verifyEmail(req, res, next);
            if (verify) {
                res.status(200).redirect('https://mycryptofolio.fr/login');
            } else {
                res.status(500).json('Token invalide');
            }
         } catch (err) {
             next(err);
         }
    },

    resendMail: async (req, res, next) => {
        try {
            const user = await userService.resendMail(req, res, next);
            if (user) {
                res.status(200).redirect('https://mycryptofolio.fr/login');
            }
        } catch (err) {
            next(err);
        }
    },
    
    forgotPassword: async (req, res, next) => {
        try {
            const user = await userService.forgotPassword(req, res, next);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    },

    modifyUser: async (req, res, next) => {
        try {
            const user = await userService.modifyUser(req, res, next);
            res.status(201).json(user.message);
        } catch(err) {
            next(err);
        }
    },

    modifyPassword: async (req, res, next) => {
        try {
            const user = await userService.modifyPassword(req, res, next);
            return res.status('201').json(user);
        } catch(err) {
            next(err);
        }
    },

    modifyPasswordForgot: async (req, res, next) => {
        try {
            const user = await userService.modifyPasswordForgot(req, res, next);
            return res.status('201').json(user);
        } catch(err) {
            next(err);
        }
    },

    modifyAvatar: async (req, res, next) => {
        try {
            const avatar = await userService.modifyAvatar(req, res, next);
            return res.status(201).json(avatar.status);
        } catch(err) {
            next(err);
        } 
    },

    deleteUser: async (req, res, next) => {
        try {
            const user = await userService.deleteUser(req, res, next);
            return res.status(201).json(user);
        } catch(err) {
            next(err);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refreshPayload = await authUtils.checkRT(req, res);
            if (refreshPayload) {
                const userData = await User.findById(refreshPayload.user.id);
                const userObj= {
                    id: userData.id
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', jwt.makeToken(userObj));
                res.status(201).json({
                    id: userData.id, 
                    nickname: userData.nickname,
                    email: userData.email, 
                    picture: userData.picture, 
                    currency: userData.currency, 
                    verify: userData.verify
                });
            }   
        } catch (err) {
            next(err);
        };
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
};