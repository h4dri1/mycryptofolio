const { Transaction, Crypto } = require('../models');
const service_fetch = require('../services/fetch');

module.exports = async (req, res, next) => {
    try {
        if (req.params.wallet_id) {
            var cryptos = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wallet_id);
        } else {
            var cryptos = await Transaction.getUserCrypto(req.userId.id);
        }
        if (cryptos[0].wallet_id || cryptos.length === 0) {
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
        }
        next();
    } catch (err) {
        next(err);
    }
}