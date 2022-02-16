const { Transaction, Wallet } = require("../models");

module.exports = {
    buyGuard: async (req, res, next) => {
        try {
            if (req.body.id) {
                const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
                if (own.length === 0) {
                    return res.status(500).json('No transaction with this id');
                }
                if (own[0].user_id !== Number(req.userId.id)) {
                    return res.status(500).json('You doesn\'t own this transaction');
                }
            } else {
                const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
                if (is_owning_wallet.length === 0) {
                    return res.status(500).json(`You have no wallet create one before add transaction`);
                } else {
                    const found = is_owning_wallet.filter(element => element.id === Number(req.params.wid)).length > 0;
                    if (!found) {
                        return res.status(500).json(`You doesn't own this wallet`);
                    }
                } 
            }
            if (Number(req.body.quantity) <= 0) {
                return res.status(500).json('Buy quantity must be a positive number');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    sellGuard: async (req, res, next) => {
        try {
            const transacWallet = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
            const wallet = transacWallet.find(element => element.coin_id === req.body.coin_id);
            if (req.body.id) {
                const own = await Transaction.getSumCoinByWalletWithSell(req.body.id);
                if (own.length === 0) {
                    return res.status(500).json('No transaction with this id');
                }
                if (own.user_id !== req.userId.id) {
                    return res.status(500).json('You doesn\'t own this transaction');
                }
                if (Number(wallet.total) === Number(own.quantity) | (Math.abs(req.body.quantity) + own.quantity) > wallet.total) {
                    return res.status(500).json('You trying to sell more coin than you have');
                } 
            } else {
                const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
                if (is_owning_wallet.length === 0) {
                    return res.status(500).json(`You have no wallet create one before add transaction`);
                } else {
                    const found = is_owning_wallet.filter(element => element.id === Number(req.params.wid)).length > 0;
                    if (!found) {
                        return res.status(500).json(`You doesn't own this wallet`);
                    }
                }
                const foundC = transacWallet.filter(element => element.coin_id === req.body.coin_id).length > 0;
                if (!foundC) {
                    return res.status(500).json('You are trying to sell coins that are not present in this wallet');
                }
                if ((Number(wallet.total) + Number(req.body.quantity)) < 0) {
                    return res.status(500).json('You trying to sell more coin than you have');
                }    
            }
            if (Number(req.body.quantity) >= 0) {
                return res.status(500).json('Selling quantity must be a negative number');
            }
        } catch {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
}