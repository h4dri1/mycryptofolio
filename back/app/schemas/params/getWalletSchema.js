const Joi = require('joi');

const schema = Joi.object({
    wallet_id: Joi.number().required(),
    cur: Joi.string().valid("EUR", "USD", "BTC", "ETH")
});

module.exports = schema;