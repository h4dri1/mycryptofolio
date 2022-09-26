const { Router } = require('express');

const router = Router();

const { userController } = require('../controllers');

const { schemas } = require('../schemas');

const { auth, validateBody, validateParams } = require('../middlewares');

const { authUtils } = require('../utils');

const rateLimit = require('express-rate-limit');

const { flush } = require('../middlewares');

router
    .get('/logout/:token', auth.logout, authUtils.logout)
    .get(
        '/jwt/login/check/:token',
        rateLimit(schemas.signupSchemaLim),
        validateParams(schemas.checkForgotTokenSchema),
        userController.checkToken
    )
    .get(
        '/jwt/refresh/:token', 
        validateParams(schemas.tokenSchema), 
        rateLimit(schemas.refreshSchemaLim), 
        userController.refresh
    )
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
        auth.routing,
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
        auth.routing,
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.changePassword), 
        flush, 
        userController.modifyPassword
    )
    .post(
        '/signup/change/avatar',
        auth.routing,
        rateLimit(schemas.userLimiter), 
        validateBody(schemas.changeAvatar), 
        flush, 
        userController.modifyAvatar
    )
    .delete(
        '/delete/user',
        auth.routing,
        rateLimit(schemas.userLimiter),
        flush,
        userController.deleteUser
    )

module.exports = router;