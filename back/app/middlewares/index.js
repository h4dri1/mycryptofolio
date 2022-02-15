const fetchMW = require('./fetchMW');
const jwtMW = require('./jwtMW');
const portfolioGuard = require('./portfolioGuard');
const validator = require('./validator');

module.exports = {
    fetchMW,
    jwtMW,
    portfolioGuard,
    validator
}