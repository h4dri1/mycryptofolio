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
            // Create new transaction
            if (!transaction) {
                transaction = 'Update ok'
            }
            return transaction
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'addTransaction.service';
                err.messageSafe = 'add transaction error';
            } 
            throw err;
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            const tid = await Transaction.delete(req.params.tid);
            return tid
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'deleteTransaction.service';
                err.messageSafe = 'delete transaction error';
            } 
            throw err;
        } 
    }
};