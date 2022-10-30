const {
  getHistoryTransactionToken,
  getERC20Tokens,
  getNFTbyAddress,
  getENSbyAddress,
  blockchainLimiter,
} = require('./blockchain.schema');
const {
  getTopCrypto,
  cryptoLimiter,
  getOneCrypto,
  getHistory,
} = require('./crypto.schema');
const {
  login,
  signUp,
  resend,
  checkForgotToken,
  forgotPassword,
  changeUser,
  changeForgotPassword,
  userLimiter,
  changePassword,
  changeAvatar,
  token,
} = require('./user.schema');
const {
  walletLimiter,
  deleteWallet,
  wallet,
} = require('./wallet.schema');
const {
  transaction,
  deleteTransaction,
  transactionLimiter,
} = require('./transaction.schema');
const {
  getPortfolio,
  getWallet,
  portfolioLimiter,
} = require('./portfolio.schema');
const { nftsLimiter } = require('./nfts.schema');
const {
  postFavorite,
  deleteFavorite,
} = require('./favorite.schema');

module.exports = {
  schemas: {
    getHistoryTransactionToken,
    getERC20Tokens,
    getNFTbyAddress,
    getENSbyAddress,
    getTopCrypto,
    cryptoLimiter,
    getOneCrypto,
    getHistory,
    login,
    signUp,
    resend,
    checkForgotToken,
    forgotPassword,
    changeUser,
    changeForgotPassword,
    userLimiter,
    changePassword,
    changeAvatar,
    token,
    walletLimiter,
    deleteWallet,
    wallet,
    transaction,
    deleteTransaction,
    transactionLimiter,
    getPortfolio,
    getWallet,
    portfolioLimiter,
    nftsLimiter,
    blockchainLimiter,
    postFavorite,
    deleteFavorite,
  },
};
