const fetchMW = require('./fetchMW');
const jwtMW = require('./jwtMW');
const portfolioGuard = require('./guardMW');
const auth = require('./authMW');

module.exports = {
    fetchMW,
    jwtMW,
    portfolioGuard,
    auth
}