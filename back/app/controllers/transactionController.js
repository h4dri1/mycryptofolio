const jwt = require('../services/jwt');
const { Transaction, Crypto, Wallet } = require('../models');

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            /////////////////////////////////////////////////////////////////////////////////
            let objRepartition;
            let objTransactions;
            let objPerformance;
            let objWallet;
            let portfolio = {};
            let empty = false;
            /////////////////////////////////////////////////////////////////////////////////
            if (req.params.wallet_id) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wallet_id);
                objRepartition = await Transaction.getDistributionByWallet(req.userId.id, req.params.wallet_id);
                objWallet = await Wallet.findSumWalletByWallet(req.userId.id, req.params.wallet_id);
                objPerformance = await Transaction.getPerformanceByWallet(req.userId.id, req.params.wallet_id);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
                objRepartition = await Transaction.getDistribution(req.userId.id);
                objWallet = await Wallet.findSumWallet(req.userId.id);
                objPerformance = await Transaction.getPerformance(req.userId.id);
                empty = await Wallet.findWalletWithNoTransaction(req.userId.id);
            };

            if (!objTransactions | !objRepartition | !objWallet | !objPerformance) {
                if (error.message) {
                    return res.status(500).json(error.message, true);
                }
                return res.status(500).json('error not defined', true);
            };
            /////////////////////////////////////////////////////////////////////////////////
            if (empty) {
                for (const emp of empty) {
                    objWallet.push({'id':emp.id, 'sum': 0, 'label':emp.label});
                }
            };
            /////////////////////////////////////////////////////////////////////////////////
            portfolio.transactions = Object.values(objTransactions);
            portfolio.distribution = objRepartition;
            portfolio.performance = objPerformance;
            portfolio.wallet = objWallet;
            /////////////////////////////////////////////////////////////////////////////////
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(200).json(portfolio);
        } catch (error) {
            if (error.message) {
                return res.status(500).json(error.message, true);
            }
            return res.status(500).json('error not defined', true);
        }
    },

    addTransaction: async (req, res) => {
        try {
            const crypto_id = await Crypto.findOneCrypto(req.body.coin_id, req.body.symbol);
            const instance = new Transaction(req.body);
            delete instance.coin_id;
            delete instance.symbol;
            instance.wallet_id = req.params.wid;
            instance.crypto_id = crypto_id[0].id;
            const transaction = await instance.save();
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            if (transaction) {
                return res.status(201).json(transaction);
            }
            res.status(204).json('Update ok')
        } catch (error) {
            if (error.message) {
                return res.status(500).json(error.message, true);
            }
            return res.status(500).json('error not defined', true);
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            await Transaction.delete(req.params.tid);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(204).json('delete ok');
        } catch (error) {
            if (error.message) {
                return res.status(500).json(error.message, true);
            }
            return res.status(500).json('error not defined', true);
        } 
    }
};