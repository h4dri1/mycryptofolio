const tokenController = require('./tokenController');
const userController = require('./user.controller');
const cryptoController = require('./crypto.controller');
const portfolioController = require('./portfolioController');
const walletController = require('./walletController');
const transactionController = require('./transactionController');
const nftsController = require('./nftsController');
const blockchainController = require('./blockchain.controller');

module.exports = {
    tokenController,
    userController,
    cryptoController,
    portfolioController,
    walletController,
    transactionController,
    nftsController,
    blockchainController
}