const loginLimiter = {
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
}

module.exports = loginLimiter