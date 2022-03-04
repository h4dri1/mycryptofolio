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
        deleteWalletSchema
} = require('./schemas');

const { jwtMW, fetchMW, guardMW, validateJWT, validateBody, validateParams } = require('./middlewares');

const { auth, cache, flush } = require('./services');

const { loginSchemaLim, signupSchemaLim } = require('./schemas')

const rateLimit = require('express-rate-limit');

router
    .get('/logout/:token', jwtMW, auth.logout)
    .get('/jwt/refresh/:token', validateJWT, tokenController.refresh)
    .post(
        '/jwt/login', 
        rateLimit(loginSchemaLim), 
        validateBody(loginSchema), 
        auth.login, 
        userController.validLoginJwt
    );

router
    .get('/cryptos/:vs/:nb(\\d+)', cache, cryptoController.getTopCrypto)
    .get('/crypto/:id/:nbd?', cache, cryptoController.getOneCrypto)
    .get('/cryptos', cache, cryptoController.getAllCryptos)
    .get('/trending', cache, cryptoController.getTrendingCryptos)
    .get('/global', cache, cryptoController.getGlobalData)
    .get('/history/:coinId/:day-:month-:year', cache, cryptoController.getHistoricalData)
    .get('/cryptoprice/:id/:vs/:include_market_cap?/:include_24hr_vol?/:include_24hr_change?/:include_last_updated_at?', cache, cryptoController.getOnePrice);

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
        jwtMW, 
        flush, 
        validateBody(transactionSchema), 
        guardMW.transactionGuard, 
        transactionController.addTransaction
    )
    .post(
        '/portfolio/wallet', 
        jwtMW, 
        flush, 
        validateBody(walletSchema), 
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
        flush, 
        guardMW.deleteTransaction, 
        transactionController.deleteTransaction
    )
    .delete(
        '/portfolio/wallet/:wid(\\d+)', 
        jwtMW, 
        flush,
        guardMW.deleteWallet, 
        walletController.deleteWallet
    );

module.exports = router;