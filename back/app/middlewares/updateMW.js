const { Transaction, Crypto } = require('../models');
const fiat = require('../services/fiat');

module.exports = async (req, res, next) => {
    // Get all cryptos owned by user
    // Fetch user's crypto price and add to db
    var checkChange = false;
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
        //=> Moche
        for (const transac in transacs) {
            if (cur.toLowerCase() !== (transacs[transac].fiat).toLowerCase()) {
                checkChange = true;
            }
        }
        await fiat.price(strCryptos, cur);
        if (checkChange) {
            await fiat.buyPrice(transacs, cur);
        }
        next();
    } catch (err) {
        next(err);
    }
}