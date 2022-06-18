const Joi = require('joi');

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = Joi.object({
    token: Joi.string().alphanum().min(128).max(128).required(),
    pass: Joi.string()
    .regex(RegExp(pattern))
    .required()
    .min(8)
    .max(20),
    passConfirm: Joi.any().valid(Joi.ref('pass')).required()
});

module.exports = schema;