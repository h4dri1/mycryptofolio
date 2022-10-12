const blockchainService = require('./blockchain.service');
const cryptoService = require('./crypto.service');
const userService = require('./user.service');
const walletService = require('./wallet.service');
const transactionService = require('./transaction.service');
const portfolioService = require('./portfolio.service');
const nftsService = require('./nfts.service');
const favoriteService = require('./favorite.service');

module.exports = {
    blockchainService,
    cryptoService,
    userService,
    walletService,
    transactionService,
    portfolioService,
    nftsService,
    favoriteService
}