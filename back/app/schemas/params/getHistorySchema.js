const Joi = require('joi');

const schema = Joi.object({
    coinId: Joi.string().required(),
    day: Joi.number().min(1).max(31).required(),
    month: Joi.number().min(1).max(12).required(),
    year: Joi.number().min(2011).max(new Date().getFullYear()).required()
});

module.exports = schema;