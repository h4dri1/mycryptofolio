const Joi = require('joi');
const { RateLimitError } = require('../error');

const transactionLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

const transaction = Joi.object({
    id: Joi.number(),
    buy_date: Joi.date().required(),
    buy: Joi.bool().required(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    coin_id: Joi.string().required(),
    symbol: Joi.string().required(),
    wallet_id: Joi.number(),
    crypto_id: Joi.number(),
    fiat: Joi.string().required()
});

const deleteTransaction = Joi.object({
    tid: Joi.number().required()
});

module.exports = { transactionLimiter, transaction, deleteTransaction };