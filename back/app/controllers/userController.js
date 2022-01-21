const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

module.exports = {
    validLogin: async (req, res) => {
        try {
            if (!req.body.password) {
                return res.status(400).json('Veuillez renseigner un mot de passe !')
            }
            if (!req.body.email) {
                return res.status(400).json(`Veuillez renseigner un nom d'utilisateur !`)
            }
            const user = await User.doLogin(req.body.email);
            if (!user) {
                return res.status(401).json('Combinaison mot de passe / utilisateur incorrect')
            }
            const isPwdValid = await bcrypt.compare(req.body.password, user.password)
            if (isPwdValid === false) {
                return res.status(401).json('Combinaison mot de passe / utilisateur incorrect')
            }
            const cleanUser = {
                "id": user.id,
                "email": user.email
            }
            const token = jwt.makeToken(cleanUser);
            const refreshToken = jwt.makeRefreshToken(cleanUser);
            const response = {
                "status": `Bienvenue ${user.nickname}`,
                "refreshToken": refreshToken
            };
            res.setHeader('Authorization', token);
            res.status(200).json(response);
        } catch (error) {
            if (error.detail) {
               throw new Error(error.detail);
            }
            throw error;
        }
    },

    getSecret: (req, res) => {
        res.send('SECRET');
    }
}