const { User, Wallet } = require('../models');
const bcrypt = require('bcrypt');
const { jwt } = require('../services');

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
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(user));
            const response = {
                "status": `(JWT) Bienvenue ${user.nickname}`,
                "refreshToken": jwt.makeRefreshToken(user)
            };
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
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(newUser));
            const response = {
                "status": `Bienvenue ${newUser.nickname}`,
                "refreshToken": jwt.makeRefreshToken(newUser)
            };     
            if (newUser) {           
                return res.status(201).json(response);
            }             
            //return res.status(204).json('update ok');
        } catch (error) {
            if (error.message) {
                return res.status(500).json(error.message, true);
            }
            return res.status(500).json('error not defined', true);
        }
    }
};