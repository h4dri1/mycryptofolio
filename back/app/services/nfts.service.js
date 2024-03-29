/* eslint-disable max-len */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const { fetch } = require('../utils');
const { NftsService } = require('../error/error.services');

module.exports = {
  getNFTCollection: async (req) => {
    try {
      const list = await fetch(`//api.opensea.io/api/v1/collection/${req.params.collection}`);
      if (list.status === 'Not Found') {
        return list;
      }
      // const test = data.find(x => x.id === req.params.collection);
      return list.collection;
    } catch (err) {
      throw new NftsService(err);
    }
  },

  getTopNFT: async (req) => {
    try {
      const details = {
        'insights_trend.period': '7d',
        include: 'insights_trend',
        sort: '-insights_trends.volume_change_percent',
        'page[limit]': 3,
      };
      const formBody = Object.keys(details).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join('&');
      const top = await fetch('//api.rarify.tech/data/contracts', {
        headers: {
          Authorization: `${process.env.RARIFY_API_KEY}`,
        },
      }, formBody);
      const data = top.data.filter((nft) => nft.attributes.image_url && !nft.attributes.name.includes('Uniswap'));
      const newData = data.slice(0, req.params.nb);
      return newData;
    } catch (err) {
      throw new NftsService(err);
    }
  },

  getTestNFT: async () => {
    try {
      const data = await fetch('//api.rarify.tech/data/contracts?include=insights&page[limit]=100&filter[has_metadata]=true', {
        headers: {
          Authorization: `${process.env.RARIFY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const { data: contracts, included } = data;
      const collectionsWithTradingVolume = contracts.map((oneContract) => {
        // Find the insights object for each collection
        const matchingInsights = included.find((oneIncluded) => oneIncluded.id === oneContract.relationships.insights.data.id);
        // Get the unique buyers from the insights
        const { address } = oneContract.attributes;
        const uniqueBuyers = matchingInsights.attributes.unique_buyers;
        const { volume } = matchingInsights.attributes;
        const { name } = oneContract.attributes;
        const token = oneContract.attributes.tokens;
        const uniqueOwners = oneContract.attributes.unique_owners;
        const { network } = oneContract.attributes;
        const avgPrice = matchingInsights.attributes.avg_price;
        const maxPrice = matchingInsights.attributes.max_price;
        const minPrice = matchingInsights.attributes.min_price;
        const { trades } = matchingInsights.attributes;
        return {
          id: oneContract.id,
          uniqueBuyers,
          address,
          volume,
          name,
          avgPrice,
          token,
          uniqueOwners,
          network,
          maxPrice,
          minPrice,
          trade: trades,
        };
      });
      console.log(collectionsWithTradingVolume);
      return collectionsWithTradingVolume;
    } catch (err) {
      throw new NftsService(err);
    }
  },
};
