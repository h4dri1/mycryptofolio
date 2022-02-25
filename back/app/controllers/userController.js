const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');
const { BadPassUser, EmailUsed, CheckYourPassword } = require('../error');

module.exports = {
    validLoginJwt: async (req, res, next) => {
        try {
            const user = await User.findOne(req.body.email);
            if (!user.id) {
                throw new BadPassUser();
            }
            const isPwdValid = await bcrypt.compare(req.body.password, user.password);
            if (isPwdValid === false) {
                throw new BadPassUser();
            }
            delete user.password;
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(user));
            const response = {
                "status": `(JWT) Bienvenue ${user.nickname}`,
                "refreshToken": jwt.makeRefreshToken(user),
                "id": user.id
            };
            console.log(req.ip)
            res.status(200).json(response);
        } catch (err) {
            next(err);
        };
    },

    addUser: async (req, res, next) => {
        try {
            const instance = new User(req.body);
            const user = await User.findOne(instance.email);
            if (user) {
                throw new EmailUsed(req.body.email);
            }
            if (instance.password !== instance.passwordCheck) {
                throw new CheckYourPassword();
            }
            instance.password = await bcrypt.hash(instance.password, 10);
            delete instance.passwordCheck;
            const newUser = await instance.save();
            delete newUser.password;
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(newUser));
            const response = {
                "status": `Bienvenue ${newUser.nickname}`,
                "refreshToken": jwt.makeRefreshToken(newUser)
            };     
            if (newUser) {           
                res.status(201).json(response);
            }             
            //return res.status(204).json('update ok');
        } catch (err) {
            next(err);
        }
    }
};