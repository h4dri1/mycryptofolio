const { User, Wallet } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

module.exports = {
    validLoginJwt: async (req, res) => {
        try {
            const user = await User.findOne(req.body.email);
            if (!user) {
                return res.status(401).json('Combinaison mot de passe / utilisateur incorrect');
            }
            const isPwdValid = await bcrypt.compare(req.body.password, user.password);
            if (isPwdValid === false) {
                return res.status(401).json('Combinaison mot de passe / utilisateur incorrect');
            }
            delete user.password;
            const token = jwt.makeToken(user);
            const refreshToken = jwt.makeRefreshToken(user);
            const response = {
                "status": `(JWT) Bienvenue ${user.nickname}`,
                "refreshToken": refreshToken
            };
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', token);
            res.status(200).json(response);
        } catch (error) {
            return res.status(401).json(error.message);
        };
    },

    addUser: async (req, res) => {
        try {
            const instance = new User(req.body);
            const user = await User.findOne(instance.email);
            if (user) {
                return res.status(401).json('email already used');
            }
            if (instance.password !== instance.passwordCheck) {
                return res.status(401).json('email already used');
            }
            instance.password = await bcrypt.hash(instance.password, 10);
            delete instance.passwordCheck;
            const newUser = await instance.save();
            delete newUser.password;
            if (newUser) {
                const refreshToken = jwt.makeRefreshToken(newUser);
                const response = {
                    "status": `(JWT) Bienvenue ${newUser.nickname}`,
                    "refreshToken": refreshToken
                };                
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', newUser);
                return res.status(201).json(response);
            }
            const refreshToken = jwt.makeRefreshToken(newUser);
            const response = {
                "status": `(JWT) Bienvenue ${newUser.nickname}`,
                "refreshToken": refreshToken
            };                
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', newUser);
            return res.status(204).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
};