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
            if (cur.toLowerCase() !== (transacs[transac].fiat).toLowerCase()) {
                const change = await service_fetch(`//api.coingecko.com/api/v3/coins/tether/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                const newData = {};
                if (cur === 'eur') {
                    if ((transacs[transac].fiat).toLowerCase() === 'usd') {
                        var newPrice = change.market_data.current_price.eur * transacs[transac].price;
                    } else if ((transacs[transac].fiat).toLowerCase() === 'btc') {
                        const changeCryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/bitcoin/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                        var newPrice = changeCryptos.market_data.current_price.eur * transacs[transac].price;
                    } else if ((transacs[transac].fiat).toLowerCase() === 'eth') {
                        const changeCryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/ethereum/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                        var newPrice = changeCryptos.market_data.current_price.eur * transacs[transac].price;
                    }
                } else if (cur === 'usd') {
                    if ((transacs[transac].fiat).toLowerCase() === 'eur') {
                        var newPrice = (1 / change.market_data.current_price.eur) * transacs[transac].price;
                    } else {
                        const coinId = await Crypto.getCryptoId(transacs[transac].symbol)
                        const changeCryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/${coinId[0].coin_id}/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                        if ((transacs[transac].fiat).toLowerCase() === 'btc') {
                            var newPrice = changeCryptos.market_data.current_price.usd;
                        } else {
                            var newPrice = changeCryptos.market_data.current_price.usd;
                        }
                    }             
                } else if (cur === 'btc') {
                    if (transacs[transac].symbol !== 'btc') {
                        const coinId = await Crypto.getCryptoId(transacs[transac].symbol)
                        const changeCryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/${coinId[0].coin_id}/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                        var newPrice = changeCryptos.market_data.current_price.btc;
                    } else {
                        var newPrice = 1
                    }
                } else if (cur === 'eth') {
                    if (transacs[transac].symbol !== 'eth') {
                        const coinId = await Crypto.getCryptoId(transacs[transac].symbol)
                        const changeCryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/${coinId[0].coin_id}/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                        var newPrice = changeCryptos.market_data.current_price.eth;
                    } else {
                        var newPrice = 1
                    }
                }
                newData.id = transacs[transac].id
                newData.price = newPrice;
                newData.fiat = cur;
                JSON.stringify(newData);
                await Crypto.updateTransactionBPrice(newData);
            }
        }
        next();
    } catch (err) {
        next(err);
    }
}