/* eslint-disable max-len */
const { blockchainService } = require('../services');

module.exports = {
  getTokens: async (req, res, next) => {
    try {
      const tokens = await blockchainService.getTokens(req, res, next);
      res.status(200).json(tokens);
    } catch (err) {
      next(err);
    }
  },

  getHistoryTransactionToken: async (req, res, next) => {
    try {
      const historyTransactionToken = await blockchainService.getHistoryTransactionToken(req, res, next);
      res.status(200).json(historyTransactionToken);
    } catch (err) {
      next(err);
    }
  },

  getNFTbyAddress: async (req, res, next) => {
    try {
      const nftByAddress = await blockchainService.getNFTbyAddress(req, res, next);
      res.status(200).json(nftByAddress);
    } catch (err) {
      next(err);
    }
  },

  getENSbyAddress: async (req, res, next) => {
    try {
      const ensByAddress = await blockchainService.getENSbyAddress(req, res, next);
      res.status(200).json(ensByAddress);
    } catch (err) {
      next(err);
    }
  },
};
