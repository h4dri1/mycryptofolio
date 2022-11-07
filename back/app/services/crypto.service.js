const { Crypto } = require('../models');
const { fetch } = require('../utils');
const { NoCryptoFound, AccessDataError } = require('../error/error');
const { CryptoService } = require('../error/error.services');
const { OneCryptoObject } = require('../objects');

module.exports = {
  getAllCryptos: async () => {
    try {
      const allCryptos = await Crypto.findAll();
      if (allCryptos.length === 0) throw new AccessDataError('get cryptos');
      return allCryptos;
    } catch (err) {
      throw new CryptoService(err);
    }
  },

  getTopCryptos: async (req) => {
    try {
      const cryptos = await fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
      if (cryptos.length === 0) throw new AccessDataError('get top cryptos');
      return cryptos.map((row) => new Crypto(row));
    } catch (err) {
      throw new CryptoService(err);
    }
  },

  getOneCrypto: async (req) => {
    try {
      const oneCryptoData = await fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}`);
      if (oneCryptoData.status === 'Not Found') throw new NoCryptoFound();
      if (oneCryptoData.length === 0) throw new AccessDataError('get one crypto');
      let days = 1;
      if (req.params.nbd) {
        days = req.params.nbd;
      }
      const chart = await fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.cur}&days=${days}`);
      const rows = new Array({ data: new OneCryptoObject(oneCryptoData), chart });
      return new Crypto(rows)[0];
    } catch (err) {
      throw new CryptoService(err);
    }
  },

  getTrendingCryptos: async () => {
    try {
      const trendingCryptosData = await fetch('//api.coingecko.com/api/v3/search/trending');
      if (trendingCryptosData.coins.length === 0) throw new AccessDataError('trending cryptos');
      return new Crypto(trendingCryptosData);
    } catch (err) {
      throw new CryptoService(err);
    }
  },

  getFearAndGreed: async () => {
    try {
      const fearAndGreedData = await fetch('//api.alternative.me/fng/?limit=1');
      if (fearAndGreedData.data.length === 0) throw new AccessDataError('fear and greed index');
      return new Crypto(fearAndGreedData);
    } catch (err) {
      throw new CryptoService(err);
    }
  },

  getGlobalData: async () => {
    try {
      const globalMarketData = await fetch('//api.coingecko.com/api/v3/global');
      if (globalMarketData.data.length === 0) throw new AccessDataError('global market data');
      return new Crypto(globalMarketData);
    } catch (err) {
      throw new CryptoService(err);
    }
  },

  getHistoricalData: async (req) => {
    try {
      const historicalData = await fetch(`//api.coingecko.com/api/v3/coins/${req.params.coinId}/history?date=${req.params.day}-${req.params.month}-${req.params.year}`);
      if (historicalData.market_data.length === 0) throw new AccessDataError('historical data');
      return new Crypto(historicalData);
    } catch (err) {
      throw new CryptoService(err);
    }
  },
};
