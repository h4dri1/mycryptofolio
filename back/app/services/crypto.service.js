const { Crypto } = require('../models');
const service_fetch = require('../services/fetch');
const { NoCryptoFound } = require('../error');
const { OneCryptoObject } = require('../objects');

module.exports = {
    getAllCryptos: async (req, res, next) => {
        try {
            const AllCryptos = await Crypto.findAll();
            return AllCryptos;
        } catch (err) {
            throw err;
        }
    },

    getTopCryptos: async (req, res, next) => {
        try {
            const cryptos = await service_fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
            return cryptos.map(row => new Crypto(row));
        } catch (err) {
            throw err;
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
            const rows = new Array({data: new OneCryptoObject(oneCryptoData), chart: chart});
            return new Crypto(rows)[0];
        } catch (err) {
            if (err.level) {
                throw err;
            } else {
                throw Error('Get Crypto Error');
            }  
        }
    },

    getTrendingCryptos: async (req, res, next) => {
        try {
            const trendingCryptosData = await service_fetch(`//api.coingecko.com/api/v3/search/trending`);
            return new Crypto(trendingCryptosData)
        } catch (err) {
            throw err;
        }
    },

    getFearAndGreed: async (req, res, next) => {
        try {
            const fearAndGreedData = await service_fetch(`//api.alternative.me/fng/?limit=1`);
            return new Crypto(fearAndGreedData);
        } catch (err) {
            throw err;
        }
    },

    getGlobalData: async (req, res, next) => {
        try {
            const globalMarketData = await service_fetch(`//api.coingecko.com/api/v3/global`);
            return new Crypto(globalMarketData);
        } catch (err) {
            throw err;
        }
    },

    getHistoricalData: async (req, res, next) => {
        try {
            const historicalData = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.coinId}/history?date=${req.params.day}-${req.params.month}-${req.params.year}`);
            return new Crypto(historicalData);
        } catch (err) {
            throw err;
        }
    }
}