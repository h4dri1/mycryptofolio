const Joi = require('joi');

const schema = Joi.object({
    cur: Joi.string().valid("EUR", "USD", "BTC", "ETH")
});

module.exports = schema;