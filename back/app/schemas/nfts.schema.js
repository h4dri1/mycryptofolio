const Joi = require('joi');
const { RateLimitError } = require('../error/error');

const nftsLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

module.exports = { nftsLimiter };