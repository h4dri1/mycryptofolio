const Joi = require('joi');
const { RateLimitError } = require('../error');

const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const userLimiter = {
    windowMs: 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        throw new RateLimitError(req.ip);
    }	
}

const signUp = Joi.object({
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

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const token = Joi.object({
    token: Joi.string().min(3).max(500).required()
});

const resend = Joi.object({
    email: Joi.string().email().required(),
});

const checkForgotToken = Joi.object({
    token: Joi.string().alphanum().required(),
});

const forgotPassword = Joi.object({
    email: Joi.string().email().required()
});

const changeUser = Joi.object({
    id: Joi.number().required(),
    email: Joi.string().email(),
    nickname: Joi.string().alphanum(),
    currency: Joi.string().alphanum()
});

const changeForgotPassword = Joi.object({
    token: Joi.string().alphanum().min(128).max(128).required(),
    pass: Joi.string()
    .regex(RegExp(pattern))
    .required()
    .min(8)
    .max(20),
    passConfirm: Joi.any().valid(Joi.ref('pass')).required()
});

const changePassword = Joi.object({
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

const changeAvatar = Joi.object({
    avatar: Joi.string().uri()
});

module.exports = { 
    login, 
    signUp, 
    resend, 
    checkForgotToken, 
    forgotPassword, 
    changeUser, 
    changeForgotPassword, 
    userLimiter,
    changePassword,
    changeAvatar,
    token
};