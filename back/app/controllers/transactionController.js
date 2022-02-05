const jwt = require('../services/jwt');
const { Transaction, Crypto, Wallet } = require('../models');

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            /////////////////////////////////////////////////////////////////////////////////
            let objRepartition;
            let objTransactions;
            let portfolio = {};
            let objPerformance = {};
            let sumValue = 0;
            let sumBuy = 0;
            let objWallet;
            let empty = false;
            /////////////////////////////////////////////////////////////////////////////////
            if (req.params.wallet_id) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wallet_id);
                objRepartition = await Transaction.getDistributionByWallet(req.userId.id, req.params.wallet_id);
                objWallet = await Wallet.findSumWalletByWallet(req.userId.id, req.params.wallet_id);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
                objRepartition = await Transaction.getDistribution(req.userId.id);
                objWallet = await Wallet.findSumWallet(req.userId.id);
                empty = await Wallet.findWalletWithNoTransaction(req.userId.id);
            };

            if (!objTransactions | !objRepartition | !objWallet) {
                return res.status(500).json(error.message, true);
            };
            /////////////////////////////////////////////////////////////////////////////////
            for (const distri in objRepartition) {
                sumValue += parseInt(objRepartition[distri].value);
                sumBuy += parseInt(objRepartition[distri].investment);
            }
            /////////////////////////////////////////////////////////////////////////////////
            const pnl = sumValue - sumBuy;

            objPerformance.investment = sumBuy;
            objPerformance.actual_value = sumValue;
            objPerformance.pnl = pnl;
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
            console.log(error);
            return res.status(500).json(error.message, true);
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
            console.log(error);
            return res.status(500).json(error.message);
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const is_owning_wallet = await Transaction.getWalletIdByTransaction(req.params.tid);
            if (is_owning_wallet.length === 0) {
                return res.status(500).json(`No transaction with this id`, true);
            } else {
                if (req.userId.id !== is_owning_wallet[0].user_id) {
                    return res.status(500).json(`You doesn't own this wallet`, true); 
                }
                await Transaction.delete(req.params.tid);
                res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
                res.setHeader('Authorization', jwt.makeToken(req.userId));
                res.status(204).json('delete ok');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
};