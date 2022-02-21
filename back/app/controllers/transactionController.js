const { Transaction, Crypto } = require('../models');

module.exports = {
    addTransaction: async (req, res, next) => {
        try {
            const crypto_id = await Crypto.findOneCrypto(req.body.coin_id, req.body.symbol);
            const instance = new Transaction(req.body);
            delete instance.coin_id;
            delete instance.symbol;
            instance.wallet_id = req.params.wid;
            instance.crypto_id = crypto_id[0].id;
            const transaction = await instance.save();
            if (transaction) {
                return res.status(201).json(transaction);
            }
            res.status(204).json('Update ok')
        } catch (err) {
            next(err);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            await Transaction.delete(req.params.tid);
            res.status(204).json('delete ok');
        } catch (err) {
            next(err);
        } 
    }
};