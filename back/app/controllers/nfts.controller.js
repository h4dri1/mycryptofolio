const { nftsService } = require('../services');

module.exports = {
  getNFTCollection: async (req, res, next) => {
    try {
      const list = await nftsService.getNFTCollection(req, res, next);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  },

  getTopNFT: async (req, res, next) => {
    try {
      const newData = await nftsService.getTopNFT(req, res, next);
      res.status(200).json(newData);
    } catch (err) {
      next(err);
    }
  },

  getTestNFT: async (req, res, next) => {
    try {
      const collectionsWithTradingVolume = await nftsService.getTestNFT(req, res, next);
      res.status(200).json(collectionsWithTradingVolume);
    } catch (err) {
      next(err);
    }
  },
};
