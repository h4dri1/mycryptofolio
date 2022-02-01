const  {Router} = require('express');

const router = Router();

const {
    userController,
    tokenController,
    cryptoController,
    transactionController,
    walletController
} = require('./controllers');

const { loginSchema,
        signupSchema, 
        transactionSchema, 
        walletSchema 
} = require('./schemas');

const { validateBody, validateJWT } = require('./middlewares/validator');

const jwtMW = require('./middlewares/jwtMW');

const fetchMW = require('./middlewares/fetchMW');

const {cache, flush} = require('./services/cache');

/**
* @typedef {Object} User_Login
* @property {string} email
* @property {string} password
*/

/**
 * @typedef {Object} Response_Login
 * @property {string} status 
 * @property {string} refreshtoken 
 */

/**
 * @typedef {Object} Cryptos
 * @property {string} id 
 * @property {string} symbol
 * @property {string} name
 * @property {string} image
 * @property {number} current_price 
 * @property {number} market_cap
 * @property {number} fully_diluted_valuation
 * @property {number} total_volume
 * @property {number} high_24h
 * @property {number} low_24h
 * @property {number} price_change_24h 
 * @property {number} price_change_percentage_24h
 * @property {number} market_cap_change_24h 
 * @property {number} market_cap_change_percentage_24h
 * @property {number} circulating_supply
 * @property {number} total_supply
 * @property {number} max_supply 
 * @property {number} ath
 * @property {number} ath_change_percentage
 * @property {number} ath_date
 * @property {number} atl
 * @property {number} atl_change_pourcentage
 * @property {number} atl_date
 * @property {number} roi
 * @property {string} last_update
 */

/**
 * @typedef {Object} AllCryptos
 * @property {number} id
 * @property {string} coin_id
 * @property {string} symbol
 * @property {string} logo
 */

/**
 * @typedef {Object} Price
 * @property {string} id
 * @property {string} usd
 */

/**
 * POST /v1/jwt/login
 * @summary Login
 * @param {User_Login} request.body.required User Object from login
 * @returns {Response_Login} 200 - User connected
 * @returns {object} 500 - An error message
 */

router.post('/jwt/login', validateBody(loginSchema), userController.validLoginJwt);

/**
 * GET /v1/jwt/refresh/{token}
 * @summary Login
 * @route GET /v1/jwt/{token}
 * @param {string} token.path.required
 * @returns {object} 200 - Token refresh ok
 * @returns {object} 500 - An error message
 */

router.get('/jwt/refresh/:token', validateJWT, tokenController.refresh);

/**
 * GET /v1/cryptos/{vs}/{nb}
 * @summary Crypto
 * @route GET /v1/cryptos/{vs}/{nb}
 * @param {string} vs.path.required
 * @param {number} nb.path.required
 * @returns {Cryptos} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/cryptos/:vs/:nb(\\d+)', cache, cryptoController.getTopCrypto);

/**
 * GET /v1/crypto/{id}
 * @summary Crypto
 * @route GET /v1/crypto/{id}
 * @param {string} id.path.required
 * @returns {object} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/crypto/:id', cache, cryptoController.getOneCrypto);

 /**
 * GET /v1/cryptoprice/{id}/{vs}/{include_market_cap}/{include_24hr_vol}/{include_24hr_change}/{include_last_updated_at}
 * @summary Crypto
 * @route GET /v1/cryptoprice/{id}/{vs}/{include_market_cap}/{include_24hr_vol}/{include_24hr_change}/{include_last_updated_at}
 * @param {string} id.path.required
 * @param {string} vs.path.required
 * @param {boolean} include_market_cap.path
 * @param {boolean} include_24hr_vol.path
 * @param {boolean} include_24hr_range.path
 * @param {boolean} include_last_updated_at.path
 * @returns {Price} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/cryptoprice/:id/:vs/:include_market_cap?/:include_24hr_vol?/:include_24hr_change?/:include_last_updated_at?', cache, cryptoController.getOnePrice);

/**
 * GET /v1/cryptos
 * @summary Crypto
 * @route GET /v1/cryptos
 * @returns {AllCryptos} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/cryptos', cache, cryptoController.getAllCryptos);

/**
 * GET /v1/cryptos
 * @summary Crypto
 * @route GET /v1/cryptos
 * @returns {AllCryptos} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/trending', cache, cryptoController.getTrendingCryptos);

/**
 * GET /v1/portfolio
 * @summary Crypto
 * @route GET /v1/portfolio
 * @returns {object} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/portfolio', jwtMW, fetchMW, transactionController.getPortfolio);

router.get('/portfolio/wallet/:wallet_id(\\d+)', jwtMW, cache, fetchMW, transactionController.getPortfolio);

router.post('/portfolio/wallet/:wid(\\d+)/transaction',flush, jwtMW, validateBody(transactionSchema), transactionController.addTransaction);

router.post('/portfolio/wallet', flush, jwtMW, validateBody(walletSchema), walletController.addWallet);

router.post('/signup', flush, validateBody(signupSchema), userController.addUser);

router.delete('/portfolio/transaction/:tid(\\d+)', flush, jwtMW, transactionController.deleteTransaction);

router.delete('/portfolio/wallet/:wid(\\d+)', flush, jwtMW, walletController.deleteWallet);

module.exports = router;