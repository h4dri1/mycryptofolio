const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().required(),
    nbd: Joi.number(),
});

module.exports = schema;