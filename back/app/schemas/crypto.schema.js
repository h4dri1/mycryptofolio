const Joi = require('joi');
const { RateLimitError } = require('../error/error');

const cryptoLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

const getTopCrypto = Joi.object({
    vs: Joi.string().required(),
    nb: Joi.number().max(1000).required(),
});

const getOneCrypto = Joi.object({
    id: Joi.string().required(),
    nbd: Joi.string(),
    cur: Joi.string()
});

const getHistory = Joi.object({
    coinId: Joi.string().required(),
    day: Joi.number().min(1).max(31).required(),
    month: Joi.number().min(1).max(12).required(),
    year: Joi.number().min(2011).max(new Date().getFullYear()).required()
});

module.exports = { getTopCrypto, cryptoLimiter, getOneCrypto, getHistory };