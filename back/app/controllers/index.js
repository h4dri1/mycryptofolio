const userController = require('./user.controller');
const cryptoController = require('./crypto.controller');
const portfolioController = require('./portfolio.controller');
const walletController = require('./wallet.controller');
const transactionController = require('./transaction.controller');
const nftsController = require('./nfts.controller');
const blockchainController = require('./blockchain.controller');
const favoriteController = require('./favorite.controller');

module.exports = {
  userController,
  cryptoController,
  portfolioController,
  walletController,
  transactionController,
  nftsController,
  blockchainController,
  favoriteController,
};
