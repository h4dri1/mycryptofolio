const { Transaction, Wallet } = require("../models");

module.exports = {
    transactionGuard: async (req, res) => {
        let youShallNotPass;
        try {
            const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
            if (own.length === 0) {
                return youShallNotPass = 'No transaction with this id';
            }
            if (own[0].user_id !== Number(req.userId.id)) {
                return youShallNotPass = 'You doesn\'t own this transaction';
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    walletGuard: async (req, res) => {
        let youShallNotPass;
        try {
            const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
            if (is_owning_wallet.length === 0) {
                return youShallNotPass = 'You have no wallet create one before add transaction';
            } else {
                const found = is_owning_wallet.filter(element => element.id === Number(req.params.wid)).length > 0;
                if (!found) {
                    return youShallNotPass = `You doesn't own this wallet`;
                }
            } 
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }

    },

    coinGuard: async (req, res) => {
        let youShallNotPass;
        const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
        const transacWallet = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
        const wallet = transacWallet.find(element => element.coin_id === req.body.coin_id);
        try {
            const foundC = transacWallet.filter(element => element.coin_id === req.body.coin_id).length > 0;
            if (!foundC) {
                return youShallNotPass = 'You are trying to sell coins that are not present in this wallet'
            }
            if (req.body.id) {
                if (Number(wallet.total) === Number(own[0].quantity) | (Math.abs(Number(req.body.quantity)) + Math.abs(Number(own[0].quantity))) > wallet.total) {
                    return youShallNotPass = 'You trying to sell more coin than you have'
                }
            } else {
                if ((Number(wallet.total) + Number(req.body.quantity)) < 0) {
                    return youShallNotPass = 'You trying to sell more coin than you have'
                }
            }
            if (req.body.buy) {
                if (Number(req.body.quantity) <= 0) {
                    return youShallNotPass = 'Buy quantity must be a positive number'
                }
            } else {
                if (Number(req.body.quantity) >= 0) {
                    return youShallNotPass = 'Selling quantity must be a negative number'
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },
}