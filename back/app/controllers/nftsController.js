const service_fetch = require('../services/fetch');

module.exports = {
    getNFTCollection: async (req, res, next) => {
        try {
            var list = await service_fetch(`//api.opensea.io/api/v1/collection/${req.params.collection}`);
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
            const top = await service_fetch(`//api.cryptoslam.io/v1/collections/top-100?timeRange=week`);
            //const img = 
            const newData = top.slice(0, req.params.nb);
            res.status(200).json(newData);
        } catch (err) {
            next(err);
        }
    },

    getTestNFT: async (req, res, next) => {
        try {
            const data = await service_fetch(`//api.rarify.tech/data/contracts?include=insights&page[limit]=100&filter[has_metadata]=true`, {headers: {
                'Authorization': 'ce600aec-ad38-4e4f-b034-76ffda6730f3',
                'Content-Type': 'application/json'
            }});

            console.log(data)

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