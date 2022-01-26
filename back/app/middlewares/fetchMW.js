const { Transaction } = require('../models');
const service_fetch = require('../services/fetch');

module.exports = async (req, res, next) => {
    try {
        const cryptos = await Transaction.getUserCrypto(req.params.id);
        if (!cryptos) {
            return res.status(500).json(error.message, true);
        };
        const strCryptos = cryptos.map((crypto) => {
            return crypto['coin_id']
        });
        searched_coins = strCryptos.toString();
        const data = await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${searched_coins}&vs_currencies=usd`);
        res.locals.cryptos = cryptos;
        res.locals.price = data;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message, true);
    }
}