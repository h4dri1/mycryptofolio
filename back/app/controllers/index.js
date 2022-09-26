const userController = require('./user.controller');
const cryptoController = require('./crypto.controller');
const portfolioController = require('./portfolioController');
const walletController = require('./wallet.controller');
const transactionController = require('./transaction.controller');
const nftsController = require('./nftsController');
const blockchainController = require('./blockchain.controller');

module.exports = {
    userController,
    cryptoController,
    portfolioController,
    walletController,
    transactionController,
    nftsController,
    blockchainController
}