const { transactionService } = require('../services');

module.exports = {
    addTransaction: async (req, res, next) => {
        try {
            const transaction = await transactionService.addTransaction(req, res, next);
            if (transaction) {
                res.status(201).json(transaction);
            } else {
                res.status(204).json(transaction);
            }
        } catch (err) {
            next(err);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            await transactionService.deleteTransaction(req, res, next);
            res.status(204).json('delete ok');
        } catch (err) {
            next(err);
        } 
    }
};