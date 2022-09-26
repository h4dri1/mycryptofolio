const loginSchema = require('./body/loginSchema');
const changeUserSchema = require('./body/changeUserSchema');
const changePasswordSchema = require('./body/changePasswordSchema');
const changeAvatarSchema = require('./body/changeAvatarSchema');
const signupSchema = require('./body/signupSchema');
const getOnePriceSchema =  require('./params/getOnePriceSchema');
const loginSchemaLim = require('./limiter/loginSchema');
const signupSchemaLim = require('./limiter/signupSchema');
const refreshSchemaLim = require('./limiter/refreshSchema');
const deleteUserSchemaLim = require('./limiter/deleteUserSchema');
const tokenSchema = require('./params/tokenSchema');
const forgotPasswordSchema = require('./body/forgotPasswordSchema');
const checkForgotTokenSchema = require('./params/checkForgotTokenSchema');
const changeForgotPasswordSchema = require('./body/changeForgotPasswordSchema');
const { 
    getHistoryTransactionToken, 
    getERC20Tokens, 
    getNFTbyAddress, 
    getENSbyAddress, 
    blockchainLimiter 
} = require('./params/blockchain.schema');
const { 
    getTopCrypto,
    cryptoLimiter, 
    getOneCrypto, 
    getHistory 
} = require('./params/crypto.schema');
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
    token
} = require('./params/user.schema');
const {
    walletLimiter,
    deleteWallet,
    wallet
} = require('./params/wallet.schema');
const {
    transaction,
    deleteTransaction,
    transactionLimiter
} = require('./params/transaction.schema');
const {
    getPortfolio,
    getWallet,
    portfolioLimiter
} = require('./params/portfolio.schema');


module.exports = { schemas: {
        loginSchema,
        tokenSchema,
        signupSchema,
        getOnePriceSchema,
        loginSchemaLim,
        signupSchemaLim,
        refreshSchemaLim,
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
        portfolioLimiter
    }
}