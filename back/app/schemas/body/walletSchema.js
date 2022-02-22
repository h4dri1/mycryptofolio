const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number(),
    label: Joi.string().required()
});

module.exports = schema;