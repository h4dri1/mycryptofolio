const  {Router} = require('express');

const router = Router();

const userController = require('./controllers/userController');

const tokenController = require('./controllers/tokenController')

const jwtMW = require('./middlewares/jwtMW');

const loginErr = require('./middlewares/loginErr');

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
 * POST /v1/login
 * @summary Login
 * @param {User_Login} request.body.required User Object from login
 * @returns {object} 200 - User connected 
 * @returns {object} 500 - An error message
 */

router.post('/login', loginErr, userController.validLogin);

/**
 * POST /v1/jwt/login
 * @summary Login
 * @param {User_Login} request.body.required User Object from login
 * @returns {Response_Login} 200 - User connected
 * @returns {object} 500 - An error message
 */

router.post('/jwt/login', loginErr, userController.validLoginJwt)

/**
 * POST /v1/jwt/refresh/{token}
 * @summary Login
 * @route POST /v1/jwt/{token}
 * @param {string} token.path.required
 * @returns {object} 200 - Token refresh ok
 * @returns {object} 500 - An error message
 */

router.post('/jwt/refresh/:token', tokenController.refresh);

router.get('/secret', jwtMW, userController.getSecret);

module.exports = router;