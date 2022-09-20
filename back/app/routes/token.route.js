const { Router } = require('express');

const router = Router();

const { tokenController } = require('../controllers');

const { validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { schemas } = require('../schemas');

router
    .get(
        '/jwt/login/check/:token',
        rateLimit(schemas.signupSchemaLim),
        validateParams(schemas.checkForgotTokenSchema),
        tokenController.checkToken
    )
    .get(
        '/jwt/refresh/:token', 
        validateParams(schemas.tokenSchema), 
        rateLimit(schemas.refreshSchemaLim), 
        tokenController.refresh
    )

module.exports = router;