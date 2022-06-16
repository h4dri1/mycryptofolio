const Joi = require('joi');

const schema = Joi.object({
    picture: Joi.string().uri()
});

module.exports = schema;