const jwt = require('../services/jwt');
const { Wallet, Transaction } = require('../models');

module.exports = {
    addWallet: async (req, res, next) => {
        try {
            const instance = new Wallet(req.body);
            instance.user_id = req.userId.id;
            const wallet = await instance.save();
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            if (wallet) {
                wallet.sum = 0;
                return res.status(201).json(wallet);
            }
            res.status(204).json(wallet);
        } catch (err) {
            next(err);
        }
    },

    deleteWallet: async (req, res, next) => {
        try {
            const transactions = await Transaction.getTransactionByWallet(req.params.wid);
            for (const transaction of transactions) {
                await Transaction.delete(transaction.transaction_id);
            }
            await Wallet.delete(req.params.wid);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            return res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
};