const { Transaction } = require('../models');
const { guard } = require('../utils');
const {
  NoTransactionId, NotYourTransaction, DeleteFirstSell, NotYourWallet,
} = require('../error/error');

module.exports = {
  // Use guard service for check and validate transaction
  // Add/Update transaction guard
  // Sell/Buy
  // If all check ok we can go to the next MW
  // If one check fail it throw a new error
  transactionGuard: async (req, res, next) => {
    try {
      if (req.body.buy) {
        if (req.body.id) {
          await guard.transactionGuard(req, res);
        } else {
          await guard.walletGuard(req, res);
        }
      } else {
        if (req.body.id) {
          await guard.transactionGuard(req, res);
        } else {
          await guard.walletGuard(req, res);
        }
        await guard.coinGuard(req, res);
      }
      await guard.buySellSign(req, res);
      next();
    } catch (err) {
      next(err);
    }
  },
  // Delete transaction guard
  // If all check ok we can going to the next MW
  // If one check fail it throw a new error
  deleteTransaction: async (req, res, next) => {
    try {
      const own = await Transaction.getSumCoinByWalletWithSell(req.params.tid);
      if (!own || Number(own.length) === 0) {
        throw new NoTransactionId(req.params.tid);
      }
      if (Number(own[0].user_id) !== Number(req.userId.id)) {
        throw new NotYourTransaction(req.params.tid);
      }
      if (Number(own[0].sell) === 0 || !own[0].buy) {
        next();
      } else {
        if (Number(own[0].total) === 0) {
          throw new DeleteFirstSell(req.params.tid);
        }
        next();
      }
    } catch (err) {
      next(err);
    }
  },
  // Delete wallet guard
  // If all check ok we can going to the next MW
  // If one check fail it throw a new error
  deleteWallet: async (req, res, next) => {
    try {
      const youShallNotPass = await guard.walletGuard(req, res);
      if (youShallNotPass) {
        throw new NotYourWallet(req.params.wid);
      } else {
        next();
      }
    } catch (err) {
      next(err);
    }
  },
};
