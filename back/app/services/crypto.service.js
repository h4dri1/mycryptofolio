const { Crypto } = require('../models');

const service_fetch = require('../services/fetch');

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


}