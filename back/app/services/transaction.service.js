const { Transaction, Crypto } = require('../models');
const { TransactionService } = require('../error/error.services');

module.exports = {
  addTransaction: async (req) => {
    try {
      const crypto_id = await Crypto.findOneCrypto(req.body.coin_id, req.body.symbol);
      const instance = new Transaction(req.body);
      delete instance.coin_id;
      delete instance.symbol;
      instance.wallet_id = req.params.wid;
      instance.crypto_id = crypto_id[0].id;
      instance[`price_${req.body.fiat.toLowerCase()}`] = Number(req.body.price);
      const transaction = await instance.save();
      return transaction;
    } catch (err) {
      throw new TransactionService(err);
    }
  },

  deleteTransaction: async (req) => {
    try {
      const tid = await Transaction.delete(req.params.tid);
      return tid;
    } catch (err) {
      throw new TransactionService(err);
    }
  },
};
