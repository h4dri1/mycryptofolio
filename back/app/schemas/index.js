const loginSchema = require('./body/loginSchema');
const changeUserSchema = require('./body/changeUserSchema');
const changePasswordSchema = require('./body/changePasswordSchema');
const changeAvatarSchema = require('./body/changeAvatarSchema');
const signupSchema = require('./body/signupSchema');
const transactionSchema = require('./body/transactionSchema');
const walletSchema = require('./body/walletSchema');
const getOnePriceSchema =  require('./params/getOnePriceSchema');
const getWalletSchema = require('./params/getWalletSchema');
const getPortfolioSchema = require('./params/getPortfolioSchema');
const deleteTransactionSchema = require('./params/deleteTransactionSchema');
const deleteWalletSchema = require('./params/deleteWalletSchema');
const loginSchemaLim = require('./limiter/loginSchema');
const signupSchemaLim = require('./limiter/signupSchema');
const refreshSchemaLim = require('./limiter/refreshSchema');
const transactionSchemaLim = require('./limiter/transactionSchema');
const deleteUserSchemaLim = require('./limiter/deleteUserSchema');
const tokenSchema = require('./params/tokenSchema');
const forgotPasswordSchema = require('./body/forgotPasswordSchema');
const checkForgotTokenSchema = require('./params/checkForgotTokenSchema');
const changeForgotPasswordSchema = require('./body/changeForgotPasswordSchema');
const { getHistoryTransactionToken, getERC20Tokens, getNFTbyAddress, getENSbyAddress, blockchainLimiter } = require('./params/blockchain.schema');
const { getTopCrypto, cryptoLimiter, getOneCrypto, getHistory } = require('./params/crypto.schema');

module.exports = { schemas: {
        loginSchema,
        tokenSchema,
        signupSchema,
        transactionSchema,
        walletSchema,
        getOnePriceSchema,
        getWalletSchema,
        getPortfolioSchema,
        deleteTransactionSchema,
        deleteWalletSchema,
        loginSchemaLim,
        signupSchemaLim,
        refreshSchemaLim,
        transactionSchemaLim,
        deleteUserSchemaLim,
        changeUserSchema,
        changePasswordSchema,
        changeAvatarSchema,
        forgotPasswordSchema,
        checkForgotTokenSchema,
        changeForgotPasswordSchema,
        blockchainLimiter,
        getHistoryTransactionToken,
        getERC20Tokens,
        getNFTbyAddress,
        getENSbyAddress,
        getTopCrypto,
        cryptoLimiter,
        getOneCrypto,
        getHistory
    }
}