const { Router } = require('express');

const router = Router();

const { portfolioController } = require('../controllers');

const { schemas } = require('../schemas');

const { auth, updateMW, validateParams, cache } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { guardMW } = require('../middlewares');

router
    .get(
        '/portfolio/:cur?',
        rateLimit(schemas.portfolioLimiter),
        auth.routing, 
        validateParams(schemas.getPortfolio),
        cache,
        updateMW, 
        portfolioController.getPortfolio
    )
    .get(
        '/portfolio/wallet/:wid(\\d+)/:cur?',
        rateLimit(schemas.portfolioLimiter),
        auth.routing,
        validateParams(schemas.getWallet),
        cache, 
        updateMW, 
        portfolioController.getPortfolio
    )

module.exports = router;