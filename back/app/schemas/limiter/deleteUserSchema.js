const { RateLimitDeleteUser } = require('../../error');

const deleteLimiter = {
    windowMs: 60 * 1000,
    max: 2,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitDeleteUser(req.ip);
    }	
}

module.exports = deleteLimiter

