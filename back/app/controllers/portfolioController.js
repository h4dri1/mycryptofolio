const { Transaction, Wallet, Portfolio } = require('../models');

module.exports = {
    getPortfolio: async (req, res, next) => {
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
                objRepartition = await Portfolio.getDistributionByWallet(req.userId.id, req.params.wallet_id);
                objWallet = await Wallet.findSumWalletByWallet(req.userId.id, req.params.wallet_id);
                objPerformance = await Portfolio.getPerformanceByWallet(req.userId.id, req.params.wallet_id);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
                objRepartition = await Portfolio.getDistribution(req.userId.id);
                objWallet = await Wallet.findSumWallet(req.userId.id);
                objPerformance = await Portfolio.getPerformance(req.userId.id);
                empty = await Wallet.findWalletWithNoTransaction(req.userId.id);
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
            res.status(200).json(portfolio);
        } catch (err) {
            next(err);
        }
    }
};