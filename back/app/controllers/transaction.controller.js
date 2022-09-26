const { Transaction, Crypto } = require('../models');
const { transactionService } = require('../utils');

module.exports = {
    addTransaction: async (req, res, next) => {
        try {
            const transaction = await transactionService.addTransaction(req, res, next);
            res.json(transaction);
        } catch (err) {
            next(err);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            const tid = await transactionService.deleteTransaction(req, res, next);
            if (tid) {
                res.status(204).json('delete ok');
            }
        } catch (err) {
            next(err);
        } 
    }
};