const updateMW = require('./updateMW');
const jwtMW = require('./jwtMW');
const guardMW = require('./guardMW');
const errorMW = require('./errorMW');
const auth = require('./auth.middleware')
const { validateBody, validateParams } = require('./validateMW');

module.exports = {
    updateMW,
    jwtMW,
    guardMW,
    errorMW,
    validateBody, 
    validateParams,
    auth
}