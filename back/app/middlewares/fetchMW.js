const { Transaction, Crypto } = require('../models');
const service_fetch = require('../services/fetch');

module.exports = async (req, res, next) => {
    try {
        let cryptos;
        if (req.params.wallet_id) {
            cryptos = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wallet_id);
        } else {
            cryptos = await Transaction.getUserCrypto(req.userId.id);
        }
        if (!cryptos) {
            return res.status(500).json(error.message, true);
        };
        const strCryptos = cryptos.map((crypto) => {
            return crypto['coin_id']
        });
        searched_coins = strCryptos.toString();
        const data = await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${searched_coins}&vs_currencies=usd`);
        const newData = {}
        for (const price in data) {        
            newData.coin_id = price;
            newData.price = data[price].usd;
            JSON.stringify(newData)
            await Crypto.updatePrice(newData);
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message, true);
    }
}