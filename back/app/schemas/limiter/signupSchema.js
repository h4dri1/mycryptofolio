const signupLimiter = {
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
}

module.exports = signupLimiter