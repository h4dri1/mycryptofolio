const { Transaction } = require('../models');
const fetch = require('cross-fetch');

module.exports = {
    getPortfolio: async (req, res) => {
        let portfolio = {};
        let data;
        let searched_coins;

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
            console.log(portfolio);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};