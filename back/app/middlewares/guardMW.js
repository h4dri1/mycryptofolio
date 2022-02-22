const { Transaction } = require("../models");
const { transactionGuard, walletGuard, coinGuard, buySellSign } = require("../services/guards");
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
            await buySellSign(req, res);
            next();
        } catch (err) {
            next(err);
        }
    },

    deleteTransaction: async (req, res, next) => {
        try {
            const own = await Transaction.getSumCoinByWalletWithSell(req.params.tid);
            if (!own | own.length === 0) {
                throw new NoTransactionId(req.params.tid);
            }
            if (own[0].user_id !== req.userId.id) {
                throw NotYourTransaction(req.params.tid);
            }
            if (own[0].sell === 0 | !own[0].buy) {
                next();
            } else {
                if (Math.round(own[0].total) === 0) {
                    throw new DeleteFirstSell(req.params.tid);
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
                throw new NotYourWallet(req.params.wid);
            } else {
                next();
            }
        } catch (err) {
            next(err)
        }
    }
}