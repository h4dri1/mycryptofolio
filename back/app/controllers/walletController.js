const jwt = require('../services/jwt');
const { Wallet } = require('../models');

module.exports = {
    addWallet: async (req, res) => {
        try {
            const instance = new Wallet(req.body);
            instance.user_id = req.userId.id
            const wallet = await instance.save();
            if (wallet) {
                return res.status(201).json(wallet);
            }
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(204).json(wallet)
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};