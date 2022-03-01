const { RateLimitLogin } = require('../../error');

const loginLimiter = {
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitLogin(req.ip);
    }	
}

module.exports = loginLimiter