const Joi = require('joi');

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const schema = Joi.object({
    email: Joi.string().email().required(),
    nickname: Joi.string().alphanum().required(),
    password: Joi.string()
    .regex(RegExp(pattern))
    .required()
    .min(8)
    .max(20),
    passwordCheck: Joi.any().valid(Joi.ref('password')).required(),
    picture: Joi.string()
});

module.exports = schema;