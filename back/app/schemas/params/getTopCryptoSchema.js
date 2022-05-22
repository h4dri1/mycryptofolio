const Joi = require('joi');

const schema = Joi.object({
    vs: Joi.string().required(),
    nb: Joi.number().max(1000).required(),
});

module.exports = schema;