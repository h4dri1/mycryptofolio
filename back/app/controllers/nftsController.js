const { fetch } = require('../utils');

module.exports = {
    getNFTCollection: async (req, res, next) => {
        try {
            var list = await fetch(`//api.opensea.io/api/v1/collection/${req.params.collection}`);
            if (list.status === 'Not Found') {
                return res.status(200).json(list);
            }
            //const test = data.find(x => x.id === req.params.collection);
            res.status(200).json(list.collection);
        } catch (err) {
            next(err);
        } 
    },

    getTopNFT: async (req, res, next) => {
        try {
            const details = {
                'insights_trend.period': '7d',
                'include': 'insights_trend',
                'sort': '-insights_trends.volume_change_percent',
                'page[limit]': 3
            }
            const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
            const top = await fetch(`//api.rarify.tech/data/contracts`, {headers: {
                'Authorization': `${process.env.RARIFY_API_KEY}`,    
            }}, formBody);
            const data = top.data.filter((nft) => nft.attributes.image_url && !nft.attributes.name.includes('Uniswap'))
            const newData = data.slice(0, req.params.nb);
            res.status(200).json(newData);
        } catch (err) {
            next(err);
        }
    },

    getTestNFT: async (req, res, next) => {
        try {
            const data = await fetch(`//api.rarify.tech/data/contracts?include=insights&page[limit]=100&filter[has_metadata]=true`, {headers: {
                'Authorization': `${process.env.RARIFY_API_KEY}`,
                'Content-Type': 'application/json'
            }});


            const { data: contracts, included } = data;
            const collectionsWithTradingVolume = contracts.map((oneContract) => {
                // Find the insights object for each collection
                const matchingInsights = included.find((oneIncluded) =>
                  oneIncluded.id === oneContract.relationships.insights.data.id
                );
                // Get the unique buyers from the insights
                const address = oneContract.attributes.address;
                const uniqueBuyers = matchingInsights.attributes.unique_buyers;
                const volume = matchingInsights.attributes.volume;
                const name = oneContract.attributes.name;
                const token = oneContract.attributes.tokens;
                const uniqueOwners = oneContract.attributes.unique_owners;
                const network = oneContract.attributes.network;
                const avgPrice = matchingInsights.attributes.avg_price;
                const maxPrice = matchingInsights.attributes.max_price;
                const minPrice = matchingInsights.attributes.min_price;
                const trades = matchingInsights.attributes.trades;
                return { id: oneContract.id, uniqueBuyers: uniqueBuyers, address: address, volume: volume, name: name, 
                        avgPrice: avgPrice, token: token, uniqueOwners: uniqueOwners, network: network, maxPrice: maxPrice, minPrice: minPrice, trade: trades };
                });
              console.log(collectionsWithTradingVolume);
            res.status(200).json(collectionsWithTradingVolume);
        } catch (err) {
            next(err);
        }
    }
};