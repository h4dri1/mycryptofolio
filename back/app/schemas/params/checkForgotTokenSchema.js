const Joi = require('joi');

const schema = Joi.object({
    token: Joi.string().alphanum().required(),
});

module.exports = schema;