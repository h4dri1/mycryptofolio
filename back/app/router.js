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
        tokenSchema,
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
        transactionSchemaLim,
        getWalletSchema,
        getHistorySchema,
        deleteUserSchemaLim,
        changeUserSchema,
        changePasswordSchema,
        changeAvatarSchema,
        changeCurrencySchema
} = require('./schemas');

// jwtMW => Check JWT Access Token for protected route
// fetchMW => Check cryptos in portfolio get the price and add it to db
// guardMW => Check and validate transaction (check what you can or can't doing with a transaction)
// validateBody, validateParams => Joi MW check data type

const { jwtMW, updateMW, guardMW, validateBody, validateParams } = require('./middlewares');

// auth => Service for ban 5x bad password and whitelist/blacklist refreshtoken
// cache => Redis db cache
// flush => Flush redis cache

const { auth, cache, flush } = require('./services');

// express rate limite MW check number of call by IP and limit

const rateLimit = require('express-rate-limit');

router
    .get('/logout/:token', validateParams(tokenSchema), jwtMW.logout, auth.logout)
    .get('/jwt/refresh/:token', validateParams(tokenSchema), rateLimit(refreshSchemaLim), tokenController.refresh)
    .post(
        '/jwt/login', 
        rateLimit(loginSchemaLim), 
        validateBody(loginSchema), 
        auth.login, 
        userController.validLoginJwt
    )
    .post(
        '/signup',
        auth.signup,
        rateLimit(signupSchemaLim), 
        validateBody(signupSchema), 
        flush, 
        userController.addUser
    )
    .post(
        '/jwt/login/forgot',
        userController.forgotPassword
    )
    .get(
        '/jwt/login/check/:token',
        userController.checkToken
    )
    .delete(
        '/delete/user',
        jwtMW.routing,
        rateLimit(deleteUserSchemaLim),
        userController.deleteUser
    )

router
    .post(
        '/signup/change/user',
        jwtMW.routing,
        rateLimit(signupSchemaLim), 
        validateBody(changeUserSchema), 
        flush, 
        userController.modifyUser
    )
    .post(
        '/signup/change/forgot/password',
        flush, 
        userController.modifyPasswordForgot
    )
    .post(
        '/signup/change/password',
        jwtMW.routing,
        rateLimit(signupSchemaLim), 
        validateBody(changePasswordSchema), 
        flush, 
        userController.modifyPassword
    )
    .post(
        '/signup/change/avatar',
        jwtMW.routing,
        rateLimit(signupSchemaLim), 
        validateBody(changeAvatarSchema), 
        flush, 
        userController.modifyAvatar
    )
    .post(
        '/signup/change/currency',
        jwtMW.routing,
        rateLimit(signupSchemaLim), 
        validateBody(changeCurrencySchema), 
        flush, 
        userController.modifyCurrency
    )

router
    .get('/cryptos/:vs/:nb(\\d+)', validateParams(getTopCryptoSchema), cache, cryptoController.getTopCrypto)
    .get('/crypto/:id/:nbd(\\d+)?', validateParams(getOneCryptoSchema), cache, cryptoController.getOneCrypto)
    .get('/cryptos', cache, cryptoController.getAllCryptos)
    .get('/trending', cache, cryptoController.getTrendingCryptos)
    .get('/global', cache, cryptoController.getGlobalData)
    .get('/history/:coinId/:day(\\d+)/:month(\\d+)/:year(\\d+)', validateParams(getHistorySchema), cache, cryptoController.getHistoricalData)
    .get('/cryptoprice/:id/:vs/:include_market_cap?/:include_24hr_vol?/:include_24hr_change?/:include_last_updated_at?',
        validateParams(getOnePriceSchema),
        cache,
        cryptoController.getOnePrice
    );

router
    .get(
        '/portfolio/:cur?', 
        jwtMW.routing, 
        validateParams(getPortfolioSchema),
        cache, //--> Need to see for working with toogle currency
        updateMW, 
        portfolioController.getPortfolio
    )
    .get(
        '/portfolio/wallet/:wid(\\d+)/:cur?',
        jwtMW.routing,
        validateParams(getWalletSchema),
        cache, 
        updateMW, 
        portfolioController.getPortfolio
    )
    .post(
        '/portfolio/wallet/:wid(\\d+)/transaction',
        rateLimit(transactionSchemaLim),
        jwtMW.routing,
        validateBody(transactionSchema),
        guardMW.transactionGuard, 
        flush,
        transactionController.addTransaction
    )
    .post(
        '/portfolio/wallet',
        rateLimit(transactionSchemaLim),
        jwtMW.routing,
        validateBody(walletSchema), 
        flush, 
        walletController.addWallet
    )
    .delete(
        '/portfolio/transaction/:tid(\\d+)', 
        jwtMW.routing,
        validateParams(deleteTransactionSchema), 
        guardMW.deleteTransaction,
        flush,
        transactionController.deleteTransaction
    )
    .delete(
        '/portfolio/wallet/:wid(\\d+)', 
        jwtMW.routing,
        validateParams(deleteWalletSchema),
        guardMW.deleteWallet,
        flush,
        walletController.deleteWallet
    );

module.exports = router;