const Joi = require('joi');
const { RateLimitError } = require('../error');

const walletLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

const wallet = Joi.object({
    id: Joi.number(),
    label: Joi.string().required()
});

const deleteWallet = Joi.object({
    wid: Joi.number().required()
});

module.exports = { wallet, walletLimiter, deleteWallet };