const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

module.exports = {
    validLoginJwt: async (req, res) => {
        try {
            const user = await User.doLogin(req.body.email);
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
            res.setHeader('Authorization', token);
            res.status(200).json(response);
        } catch (error) {
            if (error.detail) {
               throw new Error(error.detail);
            }
            throw error;
        };
    },

    validLogin: async (req, res) => {
        try {
            const user = await User.doLogin(req.body.email);
            if (!user) {
                return res.status(401).json('Combinaison mot de passe / utilisateur incorrect');
            }
            const isPwdValid = await bcrypt.compare(req.body.password, user.password);
            if (isPwdValid === false) {
                return res.status(401).json('Combinaison mot de passe / utilisateur incorrect');
            }
            res.status(200).json(`Bienvenue ${user.nickname}`);
        } catch (error) {
            if (error.detail) {
               throw new Error(error.detail);
            };
            throw error;
        };
    },

    getSecret: (req, res) => {
        try {
            const infos = {
                message: 'Ceci est un message obtenu après vérif de qui a fait la requête'
            };
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(200).json(infos);
        } catch (error) {
            if (error.detail) {
                throw new Error(error.detail);
            };
            throw error;
        };
    }
};