const { Crypto } = require('../models');
const { fetch } = require('../utils');
const { NoCryptoFound } = require('../error');
const { OneCryptoObject } = require('../objects');

module.exports = {
    getAllCryptos: async (req, res, next) => {
        try {
            const AllCryptos = await Crypto.findAll();
            return AllCryptos;
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getAllCryptos.service';
                err.messageSafe = 'get Cryptos error';
            } 
            throw err;
        }
    },

    getTopCryptos: async (req, res, next) => {
        try {
            const cryptos = await fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
            return cryptos.map(row => new Crypto(row));
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getTopCryptos.service';
                err.messageSafe = 'get top cryptos error';
            } 
            throw err;
        }
    },

    getOneCrypto: async (req, res, next) => {
        try {
            const oneCryptoData = await fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}`);
            if (oneCryptoData.status === 'Not Found') {
                throw new NoCryptoFound()
            }
            let days = 1;
            if (req.params.nbd) {
                days = req.params.nbd
            }
            const chart = await fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.cur}&days=${days}`);
            const rows = new Array({data: new OneCryptoObject(oneCryptoData), chart: chart});
            return new Crypto(rows)[0];
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getOneCrypto.service';
                err.messageSafe = 'get one crypto error';
            } 
            throw err;
        }
    },

    getTrendingCryptos: async (req, res, next) => {
        try {
            const trendingCryptosData = await fetch(`//api.coingecko.com/api/v3/search/trending`);
            return new Crypto(trendingCryptosData)
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getTrendingCryptos.service';
                err.messageSafe = 'get trending cryptos error';
            } 
            throw err;
        }
    },

    getFearAndGreed: async (req, res, next) => {
        try {
            const fearAndGreedData = await fetch(`//api.alternative.me/fng/?limit=1`);
            return new Crypto(fearAndGreedData);
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getFearAndGreed.service';
                err.messageSafe = 'get fear and greed error';
            } 
            throw err;
        }
    },

    getGlobalData: async (req, res, next) => {
        try {
            const globalMarketData = await fetch(`//api.coingecko.com/api/v3/global`);
            return new Crypto(globalMarketData);
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getGlobalData.service';
                err.messageSafe = 'get global data error';
            } 
            throw err;
        }
    },

    getHistoricalData: async (req, res, next) => {
        try {
            const historicalData = await fetch(`//api.coingecko.com/api/v3/coins/${req.params.coinId}/history?date=${req.params.day}-${req.params.month}-${req.params.year}`);
            return new Crypto(historicalData);
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'getHistoricalData.service';
                err.messageSafe = 'get historical data error';
            } 
            throw err;
        }
    }
}