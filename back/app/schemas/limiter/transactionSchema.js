const { RateLimitTransaction } = require('../../error');

const transactionLimiter = {
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitTransaction(req.ip);
    }	
}

module.exports = transactionLimiter