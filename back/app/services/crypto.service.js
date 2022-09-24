const { Crypto } = require('../models');
const service_fetch = require('../services/fetch');
const { NoCryptoFound } = require('../error');

module.exports = {
    getAllCryptos: async (req, res, next) => {
        try {
            const AllCryptos = await Crypto.findAll();
            return AllCryptos;
        } catch (err) {
            next(err);
        }
    },

    getTopCryptos: async (req, res, next) => {
        try {
            const cryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
            const topCryptos = await Crypto.topCryptos(cryptos)
            return topCryptos;
        } catch (err) {
            next(err);
        }
    },

    getOneCrypto: async (req, res, next) => {
        try {
            const oneCryptoData = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}`);
            if (oneCryptoData.status === 'Not Found') {
                throw new NoCryptoFound()
            }
            let days = 1;
            if (req.params.nbd) {
                days = req.params.nbd
            }
            const chart = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.cur}&days=${days}`);
            const oneCrypto = await Crypto.getOneCrypto(oneCryptoData, chart);
            return oneCrypto;
        } catch (err) {
            next(err);
        }
    },

    getTrendingCryptos: async (req, res, next) => {
        try {
            const trendingCryptosData = await service_fetch(`//api.coingecko.com/api/v3/search/trending`);
            const trendingCryptos = await Crypto.getTrendingCryptos(trendingCryptosData);
            return trendingCryptos
        } catch (err) {
            next(err);
        }
    },

    getFearAndGreed: async (req, res, next) => {
        try {
            const fearAndGreedData = await service_fetch(`//api.alternative.me/fng/?limit=1`);
            const fearAndGreed = await Crypto.getFearAndGreed(fearAndGreedData);
            return fearAndGreed;
        } catch (err) {
            next(err);
        }
    },

    getGlobalData: async (req, res, next) => {
        try {
            const globalMarketData = await service_fetch(`//api.coingecko.com/api/v3/global`);
            const globalMarket = await Crypto.getGlobalData(globalMarketData);
            return globalMarket;
        } catch (err) {
            next(err);
        }
    },

    getHistoricalData: async (req, res, next) => {
        try {
            const historicalData = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.coinId}/history?date=${req.params.day}-${req.params.month}-${req.params.year}`);
            const history = await Crypto.getHistoricalData(historicalData);
            return history;
        } catch (err) {
            next(err);        
        }
    }
}