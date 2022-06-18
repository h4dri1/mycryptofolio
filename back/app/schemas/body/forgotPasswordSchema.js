const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string().email().required()
});

module.exports = schema;