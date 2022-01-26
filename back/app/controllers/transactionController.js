const { Transaction } = require('../models');
const service_fetch = require('../services/fetch');

module.exports = {
    getPortfolio: async (req, res) => {
        let portfolio = {};
        let repartition = {};
        let objRepartition = {};
        let sumValue = 0;

        try {
            const transactions = await Transaction.getUserTransaction(req.params.id);
            if (!transactions) {
                return res.status(500).json(error.message, true);
            };
            const cryptos = res.locals.cryptos;
            const data = res.locals.price
            portfolio.Transactions = transactions;
            console.log(cryptos);
            console.log(data);
            for (const test of cryptos) {
                repartition[test.coin_id] = test.total * data[test.coin_id].usd
            }
            console.log(repartition)
            for (const key in repartition) {
                sumValue += parseInt(repartition[key])
            }
            for (const test2 of cryptos) {
                objRepartition[test2.coin_id] = {}
                objRepartition[test2.coin_id].name = test2.symbol
                objRepartition[test2.coin_id].quantity = test2.total
                objRepartition[test2.coin_id].value = repartition[test2.coin_id]
                objRepartition[test2.coin_id].distribution = (100 * repartition[test2.coin_id])/sumValue;
            }
            console.log(sumValue)
            portfolio.Distribution = [objRepartition];
            
            res.status(200).json(portfolio);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};