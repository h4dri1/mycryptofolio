const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().required(),
    nbd: Joi.string(),
    cur: Joi.string()
});

module.exports = schema;