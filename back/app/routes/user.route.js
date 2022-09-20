const { Router } = require('express');

const router = Router();

const { userController } = require('../controllers');

const { schemas } = require('../schemas');

const { jwtMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { auth, flush } = require('../services');

router
    .post(
        '/jwt/login',
        rateLimit(schemas.loginSchemaLim), 
        validateBody(schemas.loginSchema), 
        auth.login, 
        userController.login
    )
    .post(
        '/signup',
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.signupSchema),
        userController.addUser
    )
    .get(
        '/verify/resend/:email', 
        rateLimit(schemas.refreshSchemaLim), 
        userController.resendMail
    )
    .get(
        '/verify/:token',
        rateLimit(schemas.signupSchemaLim),
        validateParams(schemas.checkForgotTokenSchema),
        userController.verifyEmail
    )
    .post(
        '/jwt/login/forgot',
        rateLimit(schemas.signupSchemaLim),
        validateBody(schemas.forgotPasswordSchema),
        userController.forgotPassword
    )
    .post(
        '/signup/change/user',
        jwtMW.routing,
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.changeUserSchema), 
        flush, 
        userController.modifyUser
    )
    .post(
        '/signup/change/forgot/password',
        rateLimit(schemas.signupSchemaLim),
        validateBody(schemas.changeForgotPasswordSchema),
        flush, 
        userController.modifyPasswordForgot
    )
    .post(
        '/signup/change/password',
        jwtMW.routing,
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.changePasswordSchema), 
        flush, 
        userController.modifyPassword
    )
    .post(
        '/signup/change/avatar',
        jwtMW.routing,
        rateLimit(schemas.signupSchemaLim), 
        validateBody(schemas.changeAvatarSchema), 
        flush, 
        userController.modifyAvatar
    )
    .delete(
        '/delete/user',
        jwtMW.routing,
        rateLimit(schemas.deleteUserSchemaLim),
        flush,
        userController.deleteUser
    )

module.exports = router;