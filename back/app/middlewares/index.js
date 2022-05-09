const fetchMW = require('./fetchMW');
const jwtMW = require('./jwtMW');
const guardMW = require('./guardMW');
const errorMW = require('./errorMW');
const { validateBody, validateParams } = require('./validateMW');

module.exports = {
    fetchMW,
    jwtMW,
    guardMW,
    errorMW,
    validateBody, 
    validateParams
}