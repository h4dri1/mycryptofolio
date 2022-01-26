const { Crypto } = require('../models');
const service_fetch = require('../services/fetch');

module.exports = {
    getAllCryptos: async (req, res) => {
        try {
            const cryptos = await Crypto.findAll();
            if (!cryptos) {
                return res.status(500).json(error.message, true);
            };
            return res.status(200).json(cryptos);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    getTopCrypto: async (req, res) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    getOneCrypto: async (req, res) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}`);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    getOnePrice: async (req, res) => {
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
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    getTrendingCryptos: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.coingecko.com/api/v3/search/trending`);
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};