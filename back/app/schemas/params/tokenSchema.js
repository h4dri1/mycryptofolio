const Joi = require('joi');

const schema = Joi.object({
    token: Joi.string().min(3).max(500).required()
})

module.exports = schema;