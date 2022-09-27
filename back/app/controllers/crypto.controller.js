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
            const trendingCryptos = await cryptoService.getTrendingCryptos(req, res, next);
            res.status(200).json(trendingCryptos);
        } catch (err) {
            next(err);
        }
    },

    getFearAndGreed: async (req, res, next) => {
        try {
            const fearAndGreedIndex = await cryptoService.getFearAndGreed(req, res, next);
            res.status(200).json(fearAndGreedIndex);
        } catch (err) {
            next(err);
        }
    },

    getGlobalData: async (req, res, next) => {
        try {
            const globalData = await cryptoService.getGlobalData(req, res, next);
            res.status(200).json(globalData);
        } catch (err) {
            next(err);
        }
    },

    getHistoricalData: async (req, res, next) => {
        try {
            const historicalData = await cryptoService.getHistoricalData(req, res, next);
            res.status(200).json(historicalData);
        } catch (err) {
            next(err);        
        }
    }
};