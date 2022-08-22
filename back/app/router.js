const  {Router} = require('express');

const router = Router();

const {
    userController,
    tokenController,
    cryptoController,
    portfolioController,
    walletController, 
    transactionController,
    nftsController,
    blockchainController
} = require('./controllers');

const { schemas } = require('./schemas');

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
    .get('/logout/:token', validateParams(schemas.tokenSchema), jwtMW.logout, auth.logout)
    .get('/jwt/refresh/:token', validateParams(schemas.tokenSchema), rateLimit(schemas.refreshSchemaLim), tokenController.refresh)
    .get('/verify/resend/:email', rateLimit(schemas.refreshSchemaLim), userController.resendMail)
    .post(
        '/jwt/login',
        rateLimit(schemas.loginSchemaLim), 
        validateBody(schemas.loginSchema), 
        auth.login, 
        userController.validLoginJwt
    )
    .get(
        '/verify/:token',
        rateLimit(schemas.signupSchemaLim),
        validateParams(schemas.checkForgotTokenSchema),
        userController.verifyEmail
    )
    .post(
        '/signup',
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.signupSchema),
        userController.addUser
    )
    .post(
        '/jwt/login/forgot',
        rateLimit(schemas.signupSchemaLim),
        validateBody(schemas.forgotPasswordSchema),
        userController.forgotPassword
    )
    .get(
        '/jwt/login/check/:token',
        rateLimit(schemas.signupSchemaLim),
        validateParams(schemas.checkForgotTokenSchema),
        userController.checkToken
    )
    .delete(
        '/delete/user',
        jwtMW.routing,
        rateLimit(schemas.deleteUserSchemaLim),
        flush,
        userController.deleteUser
    )

router
    .post(
        '/signup/change/user',
        jwtMW.routing,
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.changeUserSchema), 
        flush, 
        userController.modifyUser
    )
    .post(
        '/signup/change/forgot/password',
        rateLimit(schemas.signupSchemaLim),
        validateBody(schemas.changeForgotPasswordSchema),
        flush, 
        userController.modifyPasswordForgot
    )
    .post(
        '/signup/change/password',
        jwtMW.routing,
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.changePasswordSchema), 
        flush, 
        userController.modifyPassword
    )
    .post(
        '/signup/change/avatar',
        jwtMW.routing,
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.changeAvatarSchema), 
        flush, 
        userController.modifyAvatar
    )
router
    .get('/tokens/history/:address', cache, blockchainController.getHistoryTransactionToken)
    .get('/token/:address/:vs/:net?/:network?', cache, blockchainController.getERC20Tokens)
    .get('/nft/:address/:network', cache, blockchainController.getNFTbyAddress)
    .get('/ens/:address', cache, blockchainController.getENSbyAddress)

router
    .get('/test', nftsController.getTestNFT)
    .get('/nft/collections/:collection', cache, nftsController.getNFTCollection)
    .get('/index/fearandgreed', cache, cryptoController.getFearAndGreed)
    .get('/nfts/top/:nb(\\d+)', cache, nftsController.getTopNFT)
    .get('/cryptos/:vs/:nb(\\d+)', validateParams(schemas.getTopCryptoSchema), cache, cryptoController.getTopCrypto)
    .get('/crypto/:id/:cur?/:nbd?', validateParams(schemas.getOneCryptoSchema), cache, cryptoController.getOneCrypto)
    .get('/cryptos', cache, cryptoController.getAllCryptos)
    .get('/trending', cache, cryptoController.getTrendingCryptos)
    .get('/global', cache, cryptoController.getGlobalData)
    .get('/history/:coinId/:day(\\d+)/:month(\\d+)/:year(\\d+)', validateParams(schemas.getHistorySchema), cache, cryptoController.getHistoricalData)
    .get('/cryptoprice/:id/:vs/:include_market_cap?/:include_24hr_vol?/:include_24hr_change?/:include_last_updated_at?',
        validateParams(schemas.getOnePriceSchema),
        cache,
        cryptoController.getOnePrice
    );

router
    .get(
        '/portfolio/:cur?', 
        jwtMW.routing, 
        validateParams(schemas.getPortfolioSchema),
        cache, //--> Need to see for working with toogle currency
        updateMW, 
        portfolioController.getPortfolio
    )
    .get(
        '/portfolio/wallet/:wid(\\d+)/:cur?',
        jwtMW.routing,
        validateParams(schemas.getWalletSchema),
        cache, 
        updateMW, 
        portfolioController.getPortfolio
    )
    .post(
        '/portfolio/wallet/:wid(\\d+)/transaction',
        rateLimit(schemas.transactionSchemaLim),
        jwtMW.routing,
        validateBody(schemas.transactionSchema),
        guardMW.transactionGuard, 
        flush,
        transactionController.addTransaction
    )
    .post(
        '/portfolio/wallet',
        rateLimit(schemas.transactionSchemaLim),
        jwtMW.routing,
        validateBody(schemas.walletSchema), 
        flush, 
        walletController.addWallet
    )
    .delete(
        '/portfolio/transaction/:tid(\\d+)', 
        jwtMW.routing,
        validateParams(schemas.deleteTransactionSchema), 
        guardMW.deleteTransaction,
        flush,
        transactionController.deleteTransaction
    )
    .delete(
        '/portfolio/wallet/:wid(\\d+)', 
        jwtMW.routing,
        validateParams(schemas.deleteWalletSchema),
        guardMW.deleteWallet,
        flush,
        walletController.deleteWallet
    );

module.exports = router;