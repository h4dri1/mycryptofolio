const { Transaction } = require('../models');

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            const cryptos = res.locals.cryptos;
            const price = res.locals.price

            let objTransactions;
            let portfolio = {};
            let value = {};
            let buy = {}
            let objRepartition = {};
            let objPerformance = {};
            let sumValue = 0;
            let sumBuy = 0;

            if (req.params.wallet_id) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.params.id, req.params.wallet_id);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.params.id);
            }

            if (!objTransactions) {
                return res.status(500).json(error.message, true);
            };

            for (const val of cryptos) {
                value[val.coin_id] = val.total * price[val.coin_id].usd
                buy[val.coin_id] =  val.total * val.buy_price
            }

            for (const key in value) {
                sumValue += parseInt(value[key])
            }

            for (const key in buy) {
                sumBuy += parseInt(buy[key])
            }

            for (const crypto of cryptos) {
                objRepartition[crypto.coin_id] = {}
                objRepartition[crypto.coin_id].name = crypto.symbol
                objRepartition[crypto.coin_id].quantity = crypto.total
                objRepartition[crypto.coin_id].value = value[crypto.coin_id]
                objRepartition[crypto.coin_id].distribution = (100 * value[crypto.coin_id])/sumValue;
            }

            const pnl = sumValue - sumBuy;

            objPerformance.investment = sumBuy;
            objPerformance.actual_value = sumValue;
            objPerformance.pnl = pnl;

            portfolio.transactions = objTransactions;
            portfolio.distribution = [objRepartition];
            portfolio.performance = [objPerformance];

            res.status(200).json(portfolio);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};