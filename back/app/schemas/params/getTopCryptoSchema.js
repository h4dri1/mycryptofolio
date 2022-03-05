const Joi = require('joi');

const schema = Joi.object({
    vs: Joi.string().required(),
    nb: Joi.number().required(),
});

module.exports = schema;