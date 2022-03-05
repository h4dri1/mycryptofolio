const Joi = require('joi');

const schema = Joi.object({
    wallet_id: Joi.number().required()
});

module.exports = schema;