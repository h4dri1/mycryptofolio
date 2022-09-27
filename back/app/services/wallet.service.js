const { Wallet, Transaction } = require('../models');

module.exports = {
    addWallet: async (req, res, next) => {
        try {
            const instance = new Wallet(req.body);
            instance.user_id = req.userId.id;
            const wallet = await instance.save();
            if (wallet) {
                wallet.sum = 0;
            }
            return wallet
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'addWallet.service';
                err.messageSafe = 'add wallet error';
            }
            throw err; 
        }
    },

    deleteWallet: async (req, res, next) => {
        try {
            const transactions = await Transaction.getTransactionByWallet(req.params.wid);
            for (const transaction of transactions) {
                await Transaction.delete(transaction.transaction_id);
            }
            await Wallet.delete(req.params.wid);
            return transactions
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'deleteWallet.service';
                err.messageSafe = 'delete wallet error';
            } 
            throw err;
        }
    }
};