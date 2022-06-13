const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const { BadPassUser, EmailUsed, CheckYourPassword } = require('../error');

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
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            if (!req.body.id) {
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
                delete newUser.password;
                res.setHeader('Authorization', jwt.makeToken(newUser));
                const response = {
                    "status": `Bienvenue ${newUser.nickname}`,
                    "refreshToken": jwt.makeRefreshToken(newUser)
                };     
                if (newUser) {           
                    return res.status(201).json(response);
                } 
            } else {
                instance.picture = req.userId.picture;
                await instance.save();
                res.setHeader('Authorization', jwt.makeToken(instance));   
                return res.status(201).json({"refreshToken": jwt.makeRefreshToken(instance)});
            }
        } catch (err) {
            next(err);
        }
    }
};