const { Transaction, Wallet } = require("../models");
const { NoTransactionId,
        NoWallet,
        NotPresentInWallet,
        NotYourTransaction,
        NotYourWallet,
        SellMustBeNegative,
        BuyMustBePositive,
        MoreCoinThanYouHave 
        } = require('../services/error');

module.exports = {
    transactionGuard: async (req, res, next) => {
        const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
        if (!own[0].transaction_id) {
            res.status(404);
            throw new NoTransactionId(req.body.id).message;
        }
        if (own[0].user_id !== Number(req.userId.id)) {
            res.status(403);
            throw new NotYourTransaction(req.body.id).message;
        }
    },

    walletGuard: async (req, res, next) => {
        const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
        if (!is_owning_wallet[0].id) {
            res.status(400);
            throw new NoWallet().message;
        } else {
            const found = is_owning_wallet.filter(element => element.id === Number(req.params.wid)).length > 0;
            if (!found) {
                res.status(403);
                throw new NotYourWallet(req.params.wid).message;
            }
        } 
    },

    coinGuard: async (req, res, next) => {
        let youShallNotPass;
        const transacWallet = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
        const wallet = transacWallet.find(element => element.coin_id === req.body.coin_id);
        const foundC = transacWallet.filter(element => element.coin_id === req.body.coin_id).length > 0;
        if (!foundC) {
            res.status(400);
            throw new NotPresentInWallet(req.body.coin_id).message;
        }
        if (req.body.id) {
            const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
            if (Number(wallet.total) === Number(own[0].quantity) | (Math.abs(Number(req.body.quantity)) + Math.abs(Number(own[0].quantity))) > wallet.total) {
                res.status(400);
                throw { 
                    coin_id: req.body.coin_id,
                    total_wallet: wallet.total,
                    quantity_sell: req.body.quantity,
                    error: new MoreCoinThanYouHave(req.body.coin_id).message
                };
            }
        } else {
            if ((Number(wallet.total) + Number(req.body.quantity)) < 0) {
                res.status(400);
                throw { 
                    coin_id: req.body.coin_id,
                    total_wallet: wallet.total,
                    quantity_sell: req.body.quantity,
                    error: new MoreCoinThanYouHave(req.body.coin_id).message
                };
            };
        }
        if (req.body.buy) {
            if (Number(req.body.quantity) <= 0) {
                res.status(400);
                throw new BuyMustBePositive().message;
            }
        } else {
            if (Number(req.body.quantity) >= 0) {
                res.status(400);
                throw new SellMustBeNegative().message;
            }
        }
    },
}