const { Transaction, Wallet } = require("../models");
const { NoTransactionId,
        NoWallet,
        NotPresentInWallet,
        NotYourTransaction,
        NotYourWallet,
        SellMustBeNegative,
        BuyMustBePositive,
        MoreCoinThanYouHave 
        } = require('../error');

module.exports = {
    // Transaction check
    // Check if transaction id exist
    // Check if the connected user own this transaction id
    transactionGuard: async (req, res, next) => {
        const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
        if (!own[0].transaction_id) {
            throw new NoTransactionId(req.body.id);
        }
        if (own[0].user_id !== Number(req.userId.id)) {
            throw new NotYourTransaction(req.ip, req.body.id);
        }
    },
    // Wallet check
    // Check if the connected user own the wallet id
    // Check if the user have a wallet
    walletGuard: async (req, res, next) => {
        const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
        if (!is_owning_wallet[0].id || is_owning_wallet.length === 0) {
            throw new NoWallet();
        } else {
            const found = is_owning_wallet.filter(element => element.id === Number(req.params.wid)).length > 0;
            if (!found) {
                throw new NotYourWallet(req.ip, req.params.wid);
            }
        } 
    },
    // Coin check
    // Check if the crypto is present in the wallet (for selling)
    // Check if the quantity of selling coin < total coin
    coinGuard: async (req, res, next) => {
        const transacWallet = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
        const wallet = transacWallet.find(element => element.coin_id === req.body.coin_id);
        const foundC = transacWallet.filter(element => element.coin_id === req.body.coin_id).length > 0;
        if (!foundC) {
            throw new NotPresentInWallet(req.body.coin_id);
        }
        if (req.body.id) {
            const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
            if (Number(wallet.total) === Number(own[0].quantity) || (Math.abs(Number(req.body.quantity)) + Math.abs(Number(own[0].quantity))) > wallet.total) {
                throw new MoreCoinThanYouHave(req.body);
            }
        } else {
            if ((Number(wallet.total) + Number(req.body.quantity)) < 0) {
                throw new MoreCoinThanYouHave(req.body);
            };
        }
    },
    // Sign Check
    // Check if buy transaction is +
    // Check if sell transaction is -
    buySellSign: async (req, res) => {
        if (req.body.buy) {
            if (Number(req.body.quantity) <= 0) {
                throw new BuyMustBePositive(req.ip);
            }
        } else {
            if (Number(req.body.quantity) >= 0) {
                throw new SellMustBeNegative(req.ip);
            }
        }
    }
}