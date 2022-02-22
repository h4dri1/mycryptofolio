const fetchMW = require('./fetchMW');
const jwtMW = require('./jwtMW');
const guardMW = require('./guardMW');
const errorMW = require('./errorMW');
const { validateBody, validateJWT, validateParams } = require('./joiMW');

module.exports = {
    fetchMW,
    jwtMW,
    guardMW,
    errorMW,
    validateBody, 
    validateJWT, 
    validateParams
}