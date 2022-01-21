const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    validLogin: async (req, res) => {
        try {
            if (!req.body.password) {
                return res.status(500).json('Veuillez renseigner un mot de passe !')
            }
            if (!req.body.email) {
                return res.status(500).json(`Veuillez renseigner un nom d'utilisateur !`)
            }
            const user = await User.findOne(req.body.email);
            if (!user) {
                return res.status(500).json('Utilisateur introuvable !')
            }
            const isPwdValid = await bcrypt.compare(req.body.password, user.password)
            if (isPwdValid === false) {
                return res.status(500).json('Mot de passe incorrect !')
            }
            res.status(200).json(`Bienvenue ${user.nickname}`)
        } catch (error) {
            if (error.detail) {
               throw new Error(error.detail);
            }
            throw error;
        }
    }
}