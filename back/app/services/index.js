const blockchainService = require('./blockchain.service');
const cryptoService = require('./crypto.service');
const userService = require('./user.service');
const walletService = require('./wallet.service');
const transactionService = require('./transaction.service');
const portfolioService = require('./portfolio.service');

module.exports = {
    blockchainService,
    cryptoService,
    userService,
    walletService,
    transactionService,
    portfolioService
}