const Joi = require('joi');

const schema = Joi.object({
    avatar: Joi.string().uri()
});

module.exports = schema;