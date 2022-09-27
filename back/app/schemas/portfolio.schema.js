const Joi = require('joi');
const { RateLimitError } = require('../error');

const portfolioLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

const getPortfolio = Joi.object({
    cur: Joi.string().valid("EUR", "USD", "BTC", "ETH")
});

const getWallet = Joi.object({
    wid: Joi.number().required(),
    cur: Joi.string().valid("EUR", "USD", "BTC", "ETH")
});

module.exports = { getPortfolio, portfolioLimiter, getWallet };