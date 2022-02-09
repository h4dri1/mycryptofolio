const jwt = require('../services/jwt');
const { Wallet, Transaction } = require('../models');

module.exports = {
    addWallet: async (req, res) => {
        try {
            const instance = new Wallet(req.body);
            instance.user_id = req.userId.id;
            const wallet = await instance.save();
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            if (wallet) {
                wallet.sum = 0;
                return res.status(201).json(wallet);
            }
            res.status(204).json(wallet);
        } catch (error) {
            if (error.message) {
                return res.status(500).json(error.message, true);
            }
            return res.status(500).json('error not defined', true);
        }
    },

    deleteWallet: async (req, res) => {
        try {
            let own_wallet = false;
            const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
            if (is_owning_wallet.length === 0) {
                return res.status(500).json(`You have no wallet`);
            } else {
                for (const own of is_owning_wallet) {
                    if (Number(req.params.wid) === own.id) {
                        own_wallet = true;
                    }
                }
                if (!own_wallet) {
                    return res.status(500).json(`You doesn't own this wallet`);
                }
            }
            const transactions = await Transaction.getTransactionByWallet(req.params.wid);
            for (const transaction of transactions) {
                await Transaction.delete(transaction.transaction_id);
            }
            await Wallet.delete(req.params.wid);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            return res.status(204).json();
        } catch (error) {
            if (error.message) {
                return res.status(500).json(error.message, true);
            }
            return res.status(500).json('error not defined', true);
        }
    }
};