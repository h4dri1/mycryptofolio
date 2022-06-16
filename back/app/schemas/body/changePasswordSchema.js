const Joi = require('joi');

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = Joi.object({
    oldPass: Joi.string()
    .regex(RegExp(pattern))
    .required()
    .min(8)
    .max(20),
    pass: Joi.string()
    .regex(RegExp(pattern))
    .required()
    .min(8)
    .max(20),
    passConfirm: Joi.any().valid(Joi.ref('pass')).required()
});

module.exports = schema;