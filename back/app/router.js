const  {Router} = require('express');

const router = Router();

const {userController, tokenController, fetchCryptoController, cryptoController} = require('./controllers');

const loginSchema = require('./schemas/loginSchema');

const {validateBody, validateJWT} = require('./middlewares/validator');

const jwtMW = require('./middlewares/jwtMW');

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
 * POST /v1/login
 * @summary Login
 * @param {User_Login} request.body.required User Object from login
 * @returns {object} 200 - User connected 
 * @returns {object} 500 - An error message
 */

router.post('/login', validateBody(loginSchema), userController.validLogin);

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

router.get('/cryptos/:vs/:nb(\\d+)', cache, fetchCryptoController.getTopCryptoPrice);

/**
 * GET /v1/cryptos
 * @summary Crypto
 * @route GET /v1/cryptos
 * @returns {AllCryptos} 200 - Crypto object
 * @returns {object} 500 - An error message
 */

router.get('/cryptos', cache, cryptoController.getAllCryptos);

router.get('/secret', jwtMW, userController.getSecret);

router.get('/flush', jwtMW, flush);

module.exports = router;