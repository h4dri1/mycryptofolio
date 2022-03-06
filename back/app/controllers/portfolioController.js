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
            if (req.params.wid) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wid);
                objRepartition = await Portfolio.getDistributionByWallet(req.userId.id, req.params.wid);
                objWallet = await Wallet.findSumWalletByWallet(req.userId.id, req.params.wid);
                objPerformance = await Portfolio.getPerformanceByWallet(req.userId.id, req.params.wid);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
                objRepartition = await Portfolio.getDistribution(req.userId.id);
                objWallet = await Wallet.findSumWallet(req.userId.id);
                objPerformance = await Portfolio.getPerformance(req.userId.id);
                empty = await Wallet.findWalletWithNoTransaction(req.userId.id);
            };

            if (!objWallet.id && !empty) {
                objWallet.id = Number(req.params.wid),
                objWallet.sum = '0',
                objWallet.label = 'long'
            }
            /////////////////////////////////////////////////////////////////////////////////
            if (empty && objWallet.id) {
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