/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-catch */
const { Crypto } = require('../models');
const fetch = require('./fetch.utils');
const { CurrencyError } = require('../error/error');

module.exports = {
  price: async (strCryptos, cur) => {
    try {
      const data = await fetch(`//api.coingecko.com/api/v3/simple/price?ids=${strCryptos.toString()}&vs_currencies=${cur}`);
      const newData = {};
      for (const price in data) {
        newData.coin_id = price;
        newData.price = data[price][cur];
        JSON.stringify(newData);
        await Crypto.updatePrice(newData);
      }
    } catch (err) {
      throw err;
    }
  },

  buyPrice: async (transacs, cur) => {
    try {
      for (const transac in transacs) {
        if (transacs[transac][`price_${cur}`] === null) {
          const coinId = await Crypto.getCryptoId(transacs[transac].symbol);
          const usdChange = await fetch(`//api.coingecko.com/api/v3/coins/tether/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);
          const cryptosChange = await fetch(`//api.coingecko.com/api/v3/coins/${coinId[0].coin_id}/history?date=${(transacs[transac].buy_date).getUTCDate()}-${(transacs[transac].buy_date).getUTCMonth() + 1}-${(transacs[transac].buy_date).getUTCFullYear()}`);

          const fiatPrice = usdChange.market_data?.current_price;
          const cryptoPrice = cryptosChange.market_data?.current_price[cur];

          const newData = { ...transacs[transac] };

          let newPrice = cryptoPrice;

          if (cur === 'eur') {
            if ((transacs[transac].fiat.toLowerCase()) === 'usd') {
              newPrice = fiatPrice[cur] * transacs[transac].price;
            }
          } else if (cur === 'usd') {
            if ((transacs[transac].fiat.toLowerCase()) === 'eur') {
              newPrice = (1 / fiatPrice.eur) * transacs[transac].price;
            }
          } else if (cur === 'btc' || cur === 'eth') {
            if (transacs[transac].symbol === cur) {
              newPrice = 1;
            }
          } else {
            throw new CurrencyError(cur);
          }

          newData.price = newPrice;
          newData[`price_${cur}`] = newPrice;
          newData.fiat = cur;
          JSON.stringify(newData);
          await Crypto.updateTransactionBPrice(newData);
        } else if (transacs[transac][`price_${cur}`] !== null
                    && Number(transacs[transac][`price_${cur}`]) !== Number(transacs[transac].price)) {
          const newData = { ...transacs[transac] };
          newData.price = transacs[transac][`price_${cur}`];
          newData.fiat = cur;
          JSON.stringify(newData);
          await Crypto.updateTransactionBPrice(newData);
        }
      }
    } catch (err) {
      throw err;
    }
  },
};
