const { Crypto } = require('../models');
const service_fetch = require('../services/fetch');

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
            let days = 1;
            if (req.params.nbd) {
                days = req.params.nbd
            }
            const chart = await service_fetch(`//api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=${req.params.cur}&days=${req.params.nbd}`);
            const superObj = {'data': {
                'id': data.id,
                'symbol': data.symbol,
                'name': data.name,
                'description': data.description.en,
                'links': data.links.homepage[0],
                'explorer': data.links.blockchain_site[0],
                'repos_url': data.links.repos_url.github,
                'image': {'thumb': [data.image.thumb][0], 'small': [data.image.small][0], 'large': [data.image.large][0]},
                'market_data': {'current_price': {'btc': data.market_data.current_price.btc, 
                                                'eth': data.market_data.current_price.eth, 'eur': data.market_data.current_price.eur,
                                                'usd': data.market_data.current_price.usd}, 
                                'market_cap': {'btc': data.market_data.market_cap.btc, 
                                                'eth': data.market_data.market_cap.eth, 'eur': data.market_data.market_cap.eur,
                                                'usd': data.market_data.market_cap.usd},
                                'fully_diluted_valuation': {'usd': data.market_data.fully_diluted_valuation.usd, 'eur': data.market_data.fully_diluted_valuation.eur, 
                                                             'eth': data.market_data.fully_diluted_valuation.eth, 'btc': data.market_data.fully_diluted_valuation.btc}, 
                                'total_volume': {'btc': data.market_data.total_volume.btc, 
                                                'eth': data.market_data.total_volume.eth, 'eur': data.market_data.total_volume.eur,
                                                'usd': data.market_data.total_volume.usd},  
                                'market_cap_rank': data.market_data.market_cap_rank, 
                                'market_cap_change_percentage_24h': data.market_data.market_cap_change_percentage_24h, 
                                'total_supply': data.market_data.total_supply, 
                                'max_supply': data.market_data.max_supply, 
                                'circulating_supply': data.market_data.circulating_supply, 
                                'last_updated': data.market_data.last_updated}
            },
                chart
            }
            res.status(200).json(superObj);
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