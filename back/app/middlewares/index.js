const fetchMW = require('./fetchMW');
const jwtMW = require('./jwtMW');
const guardMW = require('./guardMW');
const errorMW = require('./errorMW');

module.exports = {
    fetchMW,
    jwtMW,
    guardMW,
    errorMW
}