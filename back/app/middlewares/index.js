const updateMW = require('./update.middleware');
const guardMW = require('./guard.middleware');
const errorMW = require('./error.middleware');
const auth = require('./auth.middleware')
const { validateBody, validateParams } = require('./validate.middleware');
const { cache, flush } = require('./cache.middleware');

module.exports = {
    updateMW,
    guardMW,
    errorMW,
    validateBody, 
    validateParams,
    auth,
    cache,
    flush
}