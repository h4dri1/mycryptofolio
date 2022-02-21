const fetchMW = require('./fetchMW');
const jwtMW = require('./jwtMW');
const portfolioGuard = require('./portfolioGuard');
const validator = require('./validator');
const auth = require('./auth');

module.exports = {
    fetchMW,
    jwtMW,
    portfolioGuard,
    validator,
    auth
}