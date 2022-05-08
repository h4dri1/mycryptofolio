const { Crypto } = require('../models');
const service_fetch = require('./fetch');

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
                const change = await service_fetch(`//api.coingecko.com/api/v3/coins/tether/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                const coinId = await Crypto.getCryptoId(transacs[transac].symbol)
                const changeCryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/${coinId[0].coin_id}/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
                const newData = {};
                if (cur === 'eur') {
                    if ((transacs[transac].fiat).toLowerCase() === 'usd') {
                        var newPrice = change.market_data.current_price.eur * transacs[transac].price;
                    } else {
                        var newPrice = changeCryptos.market_data.current_price.eur;
                    }
                } else if (cur === 'usd') {
                    if ((transacs[transac].fiat).toLowerCase() === 'eur') {
                        var newPrice = (1 / change.market_data.current_price.eur) * transacs[transac].price;
                    } else {
                       var newPrice = changeCryptos.market_data.current_price.usd;
                    }             
                } else if (cur === 'btc') {
                    if (transacs[transac].symbol !== 'btc') {
                        var newPrice = changeCryptos.market_data.current_price.btc;
                    } else {
                        var newPrice = 1
                    }
                } else if (cur === 'eth') {
                    if (transacs[transac].symbol !== 'eth') {
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
    }
}