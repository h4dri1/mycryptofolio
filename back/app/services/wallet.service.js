/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const { Wallet, Transaction } = require('../models');
const { WalletService } = require('../error/error.services');

module.exports = {
  addWallet: async (req) => {
    try {
      const instance = new Wallet(req.body);
      instance.user_id = req.userId.id;
      const wallet = await instance.save();
      if (wallet) {
        wallet.sum = 0;
      }
      return wallet;
    } catch (err) {
      throw new WalletService(err);
    }
  },

  deleteWallet: async (req) => {
    try {
      const transactions = await Transaction.getTransactionByWallet(req.params.wid);
      for (const transaction of transactions) {
        await Transaction.delete(transaction.transaction_id);
      }
      await Wallet.delete(req.params.wid);
      return transactions;
    } catch (err) {
      throw new WalletService(err);
    }
  },
};
