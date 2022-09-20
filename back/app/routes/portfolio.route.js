const { Router } = require('express');

const router = Router();

const { portfolioController } = require('../controllers');

const { schemas } = require('../schemas');

const { jwtMW, updateMW, validateParams } = require('../middlewares');

const { cache } = require('../services');

router
    .get(
        '/portfolio/:cur?', 
        jwtMW.routing, 
        validateParams(schemas.getPortfolioSchema),
        cache, //--> Need to see for working with toogle currency
        updateMW, 
        portfolioController.getPortfolio
    )
    .get(
        '/portfolio/wallet/:wid(\\d+)/:cur?',
        jwtMW.routing,
        validateParams(schemas.getWalletSchema),
        cache, 
        updateMW, 
        portfolioController.getPortfolio
    )

module.exports = router;