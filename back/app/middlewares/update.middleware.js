const { Transaction } = require('../models');
const { update } = require('../utils');

module.exports = async (req, res, next) => {
    // Get all cryptos owned by user
    // Fetch user's crypto price and add to db
    try {
        if (req.params.wid) {
            var cryptos = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
            var transacs = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wid);
        } else {
            var cryptos = await Transaction.getUserCrypto(req.userId.id);
            var transacs = await Transaction.getUserTransaction(req.userId.id)
        }
        const strCryptos = cryptos.map((crypto) => {
            return crypto['coin_id']
        });
        if (req.params.cur) {
            var cur = req.params.cur.toLowerCase()
        } else {
            var cur = 'usd'
        }
        await update.price(strCryptos, cur);
        if (Object.entries(transacs).find(element => element[1].fiat !== cur) !== undefined) {
            await update.buyPrice(transacs, cur);
        }
        next();
    } catch (err) {
        next(err);
    }
}