const  {Router} = require('express');

const router = Router();

const userController = require('./controllers/userController');

const tokenController = require('./controllers/tokenController')

const jwtMW = require('./middlewares/jwtMW');

/**
* @typedef {Object} UserPost
* @property {string} email
* @property {string} password
*/

/**
 * POST /v1/login
 * @summary Login
 * @param {UserPost} request.body.required User Object from login
 * @returns {object} 200 - User connected
 * @returns {object} 500 - An error message
 */

router.post('/login', userController.validLogin);

router.post('/jwt/refresh/:token', tokenController.refresh)

router.get('/secret', jwtMW, userController.getSecret);

module.exports = router;