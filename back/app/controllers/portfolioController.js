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
            let emptyWallet = false;
            /////////////////////////////////////////////////////////////////////////////////
            // All 4 blocks (wallets, distribution, performance, transaction) are calculate with sql
            // If user choose one wallet
            if (req.params.wid) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wid);
                objRepartition = await Portfolio.getDistributionByWallet(req.userId.id, req.params.wid);
                objWallet = await Wallet.findSumWalletByWallet(req.userId.id, req.params.wid);
                objPerformance = await Portfolio.getPerformanceByWallet(req.userId.id, req.params.wid);
                emptyWallet = await Wallet.findWalletWithNoTransaction(req.userId.id);
            // If user choose global portfolio
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
                objRepartition = await Portfolio.getDistribution(req.userId.id);
                objWallet = await Wallet.findSumWallet(req.userId.id);
                objPerformance = await Portfolio.getPerformance(req.userId.id);
                empty = await Wallet.findWalletWithNoTransaction(req.userId.id);
            };
            /////////////////////////////////////////////////////////////////////////////////
            // Check if wallet is empty (sell and buy transaction with sum 0)
            // Add label if
            if (!objWallet.id && !empty) {
                objWallet.id = Number(req.params.wid);
                objWallet.sum = '0';
                for (const emp of emptyWallet) {
                    if (Number(emp.id) === Number(req.params.wid)) {
                        objWallet.label = emp.label
                    }
                }
            }
            /////////////////////////////////////////////////////////////////////////////////
            // Check if wallet is empty (never add transaction)
            // Add sum 0 , id, label if
            if (empty) {
                for (const emp of empty) {
                    objWallet.push({'id':emp.id, 'sum': 0, 'label':emp.label});
                }
            };
            /////////////////////////////////////////////////////////////////////////////////
            // Construct portfolio Object
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