const { Transaction } = require('../models');
const fetch = require('cross-fetch');

module.exports = {
    getPortfolio: async (req, res) => {
        let portfolio = {};
        let repartition = {};
        let objRepartition = {};
        let data;
        let searched_coins;
        let sumValue = 0;

        try {
            const transactions = await Transaction.getUserTransaction(req.params.id);
            if (!transactions) {
                return res.status(500).json(error.message, true);
            };
            const cryptos = res.locals.data;
            const strCryptos = cryptos.map((crypto) => {
                return crypto['coin_id']
            });
            searched_coins = strCryptos.toString();
            try {
                let link = `//api.coingecko.com/api/v3/simple/price?ids=${searched_coins}&vs_currencies=usd`
                const coins = await fetch(link);
                data = await coins.json();
            } catch (error) {
                console.log(error);
                return res.status(500).json(error.message, true);
            };
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