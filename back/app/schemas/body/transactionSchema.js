const Joi = require('joi');

const schema = Joi.object({
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

module.exports = schema;