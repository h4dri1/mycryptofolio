const  {Router} = require('express');

const router = Router();

const userController = require('./controllers/userController');

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

module.exports = router;