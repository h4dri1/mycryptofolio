/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const { NativeTokenObject, Erc20TokensObject } = require('../objects');
const { BlockchainModel } = require('../error/error.model');

class Blockchain {
  constructor(obj) {
    this.tokens = obj;
  }

  static async getTokens(req, res) {
    try {
      const erc20Tokens = res.locals.whiteListTokens.map((token) => new Erc20TokensObject(req, res, token));

      for (const token of erc20Tokens) {
        token.share = (token.value / res.locals.walletTotalBalance) * 100;
      }

      const tokens = [new NativeTokenObject(req, res), ...erc20Tokens];

      return new Blockchain(tokens).tokens;
    } catch (err) {
      throw new BlockchainModel(err);
    }
  }

  static async getHistoryTransactionToken(req, transactions) {
    try {
      for (const transaction of transactions.result) {
        if (transaction.from === req.params.address) {
          transaction.type = 'send';
        } else if (transaction.to === req.params.address) {
          transaction.type = 'receive';
        }
      }
      return new Blockchain(transactions).tokens;
    } catch (err) {
      throw new BlockchainModel(err);
    }
  }

  static async getNFTbyAddress(req, nfts) {
    try {
      if (nfts.result.length === 0) {
        // eslint-disable-next-line no-param-reassign
        nfts.result = [{ nft: 'no' }];
      }
      return new Blockchain(nfts.result).tokens;
    } catch (err) {
      throw new BlockchainModel(err);
    }
  }

  static async getENSbyAddress(req, ens) {
    try {
      const ensName = { name: ens.name };
      return new Blockchain(ensName).tokens;
    } catch (err) {
      throw new BlockchainModel(err);
    }
  }
}

module.exports = Blockchain;
