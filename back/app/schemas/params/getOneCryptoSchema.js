const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().required(),
    nbb: Joi.number(),
});

module.exports = schema;