const { Transaction } = require("../models");
const { buyGuard, sellGuard } = require("../services/gards");

module.exports = {
    transactionGuard: async (req, res, next) => {
        try {
            if (req.body.buy) {
                buyGuard(req, res, next)
                next();
            } else {
                sellGuard(req, res, next)
                next();
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            const own = await Transaction.getSumCoinByWalletWithSell(req.params.tid);
            if (own.length === 0) {
                return res.status(500).json('No transaction with this id');
            }
            if (own[0].user_id !== req.userId.id) {
                return res.status(500).json('You doesn\'t own this transaction');
            }
            if (own[0].sell === 0 | !own[0].buy) {
                next();
            } else {
                if (Math.round(own[0].total) === 0) {
                    return res.status(500).json('Delete first sell transaction');
                }
                next();
            }
        } catch {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
}