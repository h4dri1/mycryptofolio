const { Crypto } = require('../models');
const service_fetch = require('./fetch');
const { CurrencyError } = require('../error')

module.exports = {
    price: async (strCryptos, cur) => {
        const data = await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${strCryptos.toString()}&vs_currencies=${cur}`);
        const newData = {}
        for (const price in data) {        
            newData.coin_id = price;
            newData.price = data[price][cur];
            JSON.stringify(newData)
            await Crypto.updatePrice(newData);
        }
    },

    buyPrice: async (transacs, cur) => {
        for (const transac in transacs) {
            if (cur.toLowerCase() !== (transacs[transac].fiat).toLowerCase()) {
                const coinId = await Crypto.getCryptoId(transacs[transac].symbol)
                const usdChange = await service_fetch(`//api.coingecko.com/api/v3/coins/tether/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                const cryptosChange = await service_fetch(`//api.coingecko.com/api/v3/coins/${coinId[0].coin_id}/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                const fiatPrice = usdChange.market_data.current_price[cur];
                const cryptoPrice = cryptosChange.market_data.current_price[cur];
                const newData = {};
                if (cur === 'eur') {
                    if ((transacs[transac].fiat).toLowerCase() === 'usd') {
                        var newPrice = fiatPrice * transacs[transac].price;
                    } else {
                        var newPrice = cryptoPrice;
                    }
                } else if (cur === 'usd') {
                    if ((transacs[transac].fiat).toLowerCase() === 'eur') {
                        var newPrice = (1 / fiatPrice) * transacs[transac].price;
                    } else {
                       var newPrice = cryptoPrice;
                    }             
                } else if (cur === 'btc') {
                    if (transacs[transac].symbol !== 'btc') {
                        var newPrice = cryptoPrice;
                    } else {
                        var newPrice = 1
                    }
                } else if (cur === 'eth') {
                    if (transacs[transac].symbol !== 'eth') {
                        var newPrice = cryptoPrice;
                    } else {
                        var newPrice = 1
                    }
                } else {
                    throw new CurrencyError(cur);
                }
                newData.id = transacs[transac].id
                newData.price = newPrice;
                newData.fiat = cur;
                JSON.stringify(newData);
                await Crypto.updateTransactionBPrice(newData);
            }
        }   
    }
}