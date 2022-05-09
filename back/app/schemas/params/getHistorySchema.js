const Joi = require('joi');

const schema = Joi.object({
    coinId: Joi.string().required(),
    day: Joi.number().required(),
    month: Joi.number().required(),
    year: Joi.number().required()
});

module.exports = schema;