const Joi = require('joi');

const schema = Joi.object({
    id: Joi.number().required(),
    email: Joi.string().email(),
    nickname: Joi.string().alphanum()
});

module.exports = schema;