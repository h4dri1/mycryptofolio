const { Transaction, Crypto } = require('../models');
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
        searched_coins = strCryptos.toString();
        const data = await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${searched_coins}&vs_currencies=${cur}`);
        const newData = {}
        for (const price in data) {        
            newData.coin_id = price;
            newData.price = data[price][cur];
            JSON.stringify(newData)
            await Crypto.updatePrice(newData);
        }
        for (const transac in transacs) {
            if (cur !== transacs[transac].fiat) {
                const change = await service_fetch(`//api.coingecko.com/api/v3/coins/tether/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                const newData = {};
                if (cur === 'eur') {
                    var newPrice = change.market_data.current_price.eur * transacs[transac].price;
                } else {
                    var newPrice = ((1 - change.market_data.current_price.eur) + 1) * transacs[transac].price;
                }
                newData.id = transacs[transac].id
                newData.price = newPrice;
                newData.fiat = cur
                JSON.stringify(newData);
                await Crypto.updateTransactionBPrice(newData);
            }
        }
        next();
    } catch (err) {
        next(err);
    }
}