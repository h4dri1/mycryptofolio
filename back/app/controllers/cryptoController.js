const { Crypto } = require('../models');
const service_fetch = require('../services/fetch');
const { NoCryptoFound } = require('../error');
const { OneCryptoObject } = require('../class');

module.exports = {
    getAllCryptos: async (req, res, next) => {
        try {
            const cryptos = await Crypto.findAll();
            res.status(200).json(cryptos);
        } catch (err) {
            next(err);
        }
    },

    getTopCrypto: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    },

    getOneCrypto: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}`);
            if (data.status === 'Not Found') {
                throw new NoCryptoFound()
            }
            let days = 1;
            if (req.params.nbd) {
                days = req.params.nbd
            }
            const chart = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.cur}&days=${days}`);
            const oneCrypto = new OneCryptoObject(data);
            res.status(200).json({data: oneCrypto, chart: chart});
        } catch (err) {
            next(err);
        }
    },

    getOnePrice: async (req, res, next) => {
        try {
            let link = `//api.coingecko.com/api/v3/simple/price?ids=${req.params.id}&vs_currencies=${req.params.vs}`
            if (req.params.include_market_cap) {
                link = link + '&include_market_cap=true';
            }
            if (req.params.include_24hr_vol) {
                link = link + '&include_24hr_vol=true';
            }
            if (req.params.include_24hr_change) {
                link = link + '&include_24hr_change=true';
            }
            if (req.params.include_last_updated_at) {
                link = link + '&include_last_updated_at=true';
            }
            const data = await service_fetch(link);
            res.status(200).json(data);
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