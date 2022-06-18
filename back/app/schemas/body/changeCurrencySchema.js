const Joi = require('joi');

const schema = Joi.object({
    currency: Joi.string().required()
});

module.exports = schema;