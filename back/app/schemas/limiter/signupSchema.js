const { RateLimitSignup } = require('../../error');

const signupLimiter = {
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitSignup();
    }
}

module.exports = signupLimiter