const service_fetch = require('../services/fetch');
const { NoCryptoFound } = require('../error');
const { OneCryptoObject } = require('../objects');
const { cryptoService } = require('../services');

module.exports = {
    getAllCryptos: async (req, res, next) => {
        try {
            const cryptos = await cryptoService.getAllCryptos(req, res, next);
            res.status(200).json(cryptos);
        } catch (err) {
            next(err);
        }
    },

    getTopCrypto: async (req, res, next) => {
        try {
            const topCrypto = await cryptoService.getTopCryptos(req, res, next);
            res.status(200).json(topCrypto);
        } catch (err) {
            next(err);
        }
    },

    getOneCrypto: async (req, res, next) => {
        try {
            const oneCrypto = await cryptoService.getOneCrypto(req, res, next);
            res.status(200).json(oneCrypto);
        } catch (err) {
            next(err);
        }
    },
 
    getTrendingCryptos: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/search/trending`);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },

    getFearAndGreed: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.alternative.me/fng/?limit=1`);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },

    getGlobalData: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/global`);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },

    getHistoricalData: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.coinId}/history?date=${req.params.day}-${req.params.month}-${req.params.year}`);
            res.status(200).json(data);
        } catch (err) {
            next(err);        
        }
    }
};