const Joi = require('joi');
const { RateLimitError } = require('../error/error');

const favortiteLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

const postFavorite = Joi.object({
    vs: Joi.string().required(),
    id: Joi.number().required(),
});

const deleteFavorite = Joi.object({
    id: Joi.number().required(),
});

module.exports = { favortiteLimiter, postFavorite, deleteFavorite };