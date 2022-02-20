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
            throw new NoTransactionId(req.body.id);
        }
        if (own[0].user_id !== Number(req.userId.id)) {
            throw new NotYourTransaction(req.body.id);
        }
    },

    walletGuard: async (req, res, next) => {
        const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
        if (!is_owning_wallet[0].id | is_owning_wallet.length === 0) {
            throw new NoWallet();
        } else {
            const found = is_owning_wallet.filter(element => element.id === Number(req.params.wid)).length > 0;
            if (!found) {
                throw new NotYourWallet(req.params.wid);
            }
        } 
    },

    coinGuard: async (req, res, next) => {
        const transacWallet = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
        const wallet = transacWallet.find(element => element.coin_id === req.body.coin_id);
        const foundC = transacWallet.filter(element => element.coin_id === req.body.coin_id).length > 0;
        if (!foundC) {
            throw new NotPresentInWallet(req.body.coin_id);
        }
        if (req.body.id) {
            const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
            if (Number(wallet.total) === Number(own[0].quantity) | (Math.abs(Number(req.body.quantity)) + Math.abs(Number(own[0].quantity))) > wallet.total) {
                throw new MoreCoinThanYouHave(req.body, wallet);
            }
        } else {
            if ((Number(wallet.total) + Number(req.body.quantity)) < 0) {
                throw new MoreCoinThanYouHave(req.body, wallet);
            };
        }
    },

    buySellSign: async (req, res) => {
        if (req.body.buy) {
            if (Number(req.body.quantity) <= 0) {
                throw new BuyMustBePositive();
            }
        } else {
            if (Number(req.body.quantity) >= 0) {
                throw new SellMustBeNegative();
            }
        }
    }
}