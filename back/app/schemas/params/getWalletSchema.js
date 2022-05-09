const Joi = require('joi');

const schema = Joi.object({
    wid: Joi.number().required(),
    cur: Joi.string().valid("EUR", "USD", "BTC", "ETH")
});

module.exports = schema;