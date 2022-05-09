const loginSchema = require('./body/loginSchema');
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
const tokenSchema = require('./params/tokenSchema');
const getHistorySchema = require('./params/getHistorySchema');

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
    getHistorySchema
}