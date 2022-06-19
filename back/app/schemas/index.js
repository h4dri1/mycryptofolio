const loginSchema = require('./body/loginSchema');
const changeUserSchema = require('./body/changeUserSchema');
const changePasswordSchema = require('./body/changePasswordSchema');
const changeAvatarSchema = require('./body/changeAvatarSchema');
const signupSchema = require('./body/signupSchema');
const transactionSchema = require('./body/transactionSchema');
const walletSchema = require('./body/walletSchema');
const getTopCryptoSchema = require('./params/getTopCryptoSchema');
const getOneCryptoSchema = require('./params/getOneCryptoSchema');
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
const getHistorySchema = require('./params/getHistorySchema');
const forgotPasswordSchema = require('./body/forgotPasswordSchema');
const checkForgotTokenSchema = require('./params/checkForgotTokenSchema');
const changeForgotPasswordSchema = require('./body/changeForgotPasswordSchema');

module.exports = { 
    loginSchema,
    tokenSchema,
    signupSchema,
    transactionSchema,
    walletSchema,
    getTopCryptoSchema,
    getOneCryptoSchema,
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
    getHistorySchema,
    changeUserSchema,
    changePasswordSchema,
    changeAvatarSchema,
    forgotPasswordSchema,
    checkForgotTokenSchema,
    changeForgotPasswordSchema
}