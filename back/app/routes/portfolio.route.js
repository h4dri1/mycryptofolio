const { Router } = require('express');

const router = Router();

const { portfolioController } = require('../controllers');

const { schemas } = require('../schemas');

const { auth, updateMW, validateParams } = require('../middlewares');

const { cache } = require('../middlewares');

router
    .get(
        '/portfolio/:cur?', 
        auth.routing, 
        validateParams(schemas.getPortfolioSchema),
        cache, //--> Need to see for working with toogle currency
        updateMW, 
        portfolioController.getPortfolio
    )
    .get(
        '/portfolio/wallet/:wid(\\d+)/:cur?',
        auth.routing,
        validateParams(schemas.getWalletSchema),
        cache, 
        updateMW, 
        portfolioController.getPortfolio
    )

module.exports = router;