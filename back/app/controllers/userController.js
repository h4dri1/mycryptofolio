const { User, Wallet } = require('../models');
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
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', token);
            res.status(200).json(response);
        } catch (error) {
            return res.status(401).json(error.message);
        };
    },

    
};