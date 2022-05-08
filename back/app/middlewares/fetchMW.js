const { Transaction, Crypto } = require('../models');
const fiat = require('../services/fiat');
const service_fetch = require('../services/fetch');

module.exports = async (req, res, next) => {
    // Get all cryptos owned by user
    // Fetch user's crypto price and add to db
    try {
        if (req.params.wid) {
            var cryptos = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
        } else {
            var cryptos = await Transaction.getUserCrypto(req.userId.id);
        }
        const transacs = await Transaction.getUserTransaction(req.userId.id)
        const strCryptos = cryptos.map((crypto) => {
            return crypto['coin_id']
        });
        if (req.params.cur) {
            var cur = req.params.cur.toLowerCase()
        } else {
            var cur = 'usd'
        }
        await fiat.price(strCryptos, cur);
        await fiat.buyPrice(transacs, cur);
        next();
    } catch (err) {
        next(err);
    }
}