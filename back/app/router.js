const  {Router} = require('express');

const router = Router();

const {
    userController,
    tokenController,
    cryptoController,
    portfolioController,
    walletController, 
    transactionController
} = require('./controllers');

const { loginSchema,
        signupSchema, 
        transactionSchema, 
        walletSchema,
        getTopCryptoSchema,
        getOneCryptoSchema,
        getOnePriceSchema,
        getPortfolioSchema,
        deleteTransactionSchema,
        deleteWalletSchema,
        loginSchemaLim, 
        signupSchemaLim,
        refreshSchemaLim,
        transactionSchemaLim
} = require('./schemas');

const { jwtMW, fetchMW, guardMW, validateJWT, validateBody, validateParams } = require('./middlewares');

const { auth, cache, flush } = require('./services');

const rateLimit = require('express-rate-limit');

router
    .get('/logout/:token', jwtMW, auth.logout)
    .get('/jwt/refresh/:token', rateLimit(refreshSchemaLim), validateJWT, tokenController.refresh)
    .post(
        '/jwt/login', 
        rateLimit(loginSchemaLim), 
        validateBody(loginSchema), 
        auth.login, 
        userController.validLoginJwt
    );

router
    .get('/cryptos/:vs/:nb(\\d+)', validateParams(getTopCryptoSchema), cache, cryptoController.getTopCrypto)
    .get('/crypto/:id/:nbd?', validateParams(getOneCryptoSchema), cache, cryptoController.getOneCrypto)
    .get('/cryptos', cache, cryptoController.getAllCryptos)
    .get('/trending', cache, cryptoController.getTrendingCryptos)
    .get('/global', cache, cryptoController.getGlobalData)
    .get('/history/:coinId/:day-:month-:year', cache, cryptoController.getHistoricalData)
    .get('/cryptoprice/:id/:vs/:include_market_cap?/:include_24hr_vol?/:include_24hr_change?/:include_last_updated_at?', validateParams(getOnePriceSchema), cache, cryptoController.getOnePrice);

router
    .get(
        '/portfolio', 
        jwtMW, 
        cache, 
        fetchMW, 
        portfolioController.getPortfolio
    )
    .get(
        '/portfolio/wallet/:wid(\\d+)', 
        jwtMW, 
        cache, 
        fetchMW, 
        portfolioController.getPortfolio
    )
    .post(
        '/portfolio/wallet/:wid(\\d+)/transaction',
        rateLimit(transactionSchemaLim),
        jwtMW,
        validateBody(transactionSchema), 
        flush, 
        guardMW.transactionGuard, 
        transactionController.addTransaction
    )
    .post(
        '/portfolio/wallet',
        rateLimit(transactionSchemaLim),
        jwtMW,
        validateBody(walletSchema), 
        flush, 
        walletController.addWallet
    )
    .post(
        '/signup', 
        rateLimit(signupSchemaLim), 
        validateBody(signupSchema), 
        flush, 
        userController.addUser
    )
    .delete(
        '/portfolio/transaction/:tid(\\d+)', 
        jwtMW,
        validateParams(deleteTransactionSchema), 
        guardMW.deleteTransaction,
        flush,
        transactionController.deleteTransaction
    )
    .delete(
        '/portfolio/wallet/:wid(\\d+)', 
        jwtMW,
        validateParams(deleteWalletSchema),
        guardMW.deleteWallet,
        flush,
        walletController.deleteWallet
    );

module.exports = router;