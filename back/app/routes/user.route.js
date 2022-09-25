const { Router } = require('express');

const router = Router();

const { userController } = require('../controllers');

const { schemas } = require('../schemas');

const { auth, jwtMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush } = require('../services');

router
    .post(
        '/jwt/login',
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.login), 
        auth.login, 
        userController.login
    )
    .post(
        '/signup',
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.signUp),
        userController.addUser
    )
    .get(
        '/verify/resend/:email', 
        rateLimit(schemas.userLimiter), 
        validateParams(schemas.resendToken),
        userController.resendMail
    )
    .get(
        '/verify/:token',
        rateLimit(schemas.userLimiter),
        validateParams(schemas.checkForgotToken),
        userController.verifyEmail
    )
    .post(
        '/jwt/login/forgot',
        rateLimit(schemas.userLimiter),
        validateBody(schemas.forgotPassword),
        userController.forgotPassword
    )
    .post(
        '/signup/change/user',
        jwtMW.routing,
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.changeUser), 
        flush, 
        userController.modifyUser
    )
    .post(
        '/signup/change/forgot/password',
        rateLimit(schemas.userLimiter),
        validateBody(schemas.changeForgotPassword),
        flush, 
        userController.modifyPasswordForgot
    )
    .post(
        '/signup/change/password',
        jwtMW.routing,
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.changePassword), 
        flush, 
        userController.modifyPassword
    )
    .post(
        '/signup/change/avatar',
        jwtMW.routing,
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.changeAvatar), 
        flush, 
        userController.modifyAvatar
    )
    .delete(
        '/delete/user',
        jwtMW.routing,
        rateLimit(schemas.userLimiter),
        flush,
        userController.deleteUser
    )

module.exports = router;