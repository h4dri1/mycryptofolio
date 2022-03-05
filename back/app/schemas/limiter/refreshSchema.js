const { RateLimitRefresh } = require('../../error');

const refreshLimiter = {
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitRefresh(req.ip);
    }	
}

module.exports = refreshLimiter