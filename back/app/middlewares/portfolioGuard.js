const { Transaction } = require("../models");
const { transactionGuard, walletGuard, coinGuard } = require("../services/gards");
const { NoTransactionId, NotYourTransaction, DeleteFirstSell, NotYourWallet } = require('../services/error');

module.exports = {
    transactionGuard: async (req, res, next) => {
        try {
            if (req.body.buy) {
                if (req.body.id) {
                    transactionGuard(req, res);
                } else {
                    await walletGuard(req, res);
                }
            } else {
                if (req.body.id) {
                    await transactionGuard(req, res);
                } else {
                    await walletGuard(req, res);
                }
                await coinGuard(req, res);
            }
            next();
        } catch (err) {
            next(err);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            const own = await Transaction.getSumCoinByWalletWithSell(req.params.tid);
            if (!own[0].transaction_id) {
                res.status(404)
                throw new NoTransactionId(req.params.tid).message;
            }
            if (own[0].user_id !== req.userId.id) {
                res.status(403)
                throw NotYourTransaction(req.params.tid).message;
            }
            if (own[0].sell === 0 | !own[0].buy) {
                next();
            } else {
                if (Math.round(own[0].total) === 0) {
                    res.status(400)
                    throw new DeleteFirstSell(req.params.tid).message;
                }
                next();
            }
        } catch (err) { 
            next(err)
        }
    }, 

    deleteWallet: async (req, res, next) => {
        try {
            const youShallNotPass = await walletGuard(req, res);
            if (youShallNotPass) {
                throw new NotYourWallet(req.params.wid).message;
            } else {
                next();
            }
        } catch (err) {
            next(err)
        }
    }
}