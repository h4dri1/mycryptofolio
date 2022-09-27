const { Router } = require('express');

const router = Router();

const { cryptoController } = require('../controllers');

const { schemas } = require('../schemas');

const { validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { cache } = require('../middlewares');

router
    .get(
        '/index/fearandgreed',
        rateLimit(schemas.cryptoLimiter),
        cache, 
        cryptoController.getFearAndGreed
    )
    .get(
        '/cryptos/:vs/:nb(\\d+)',
        rateLimit(schemas.cryptoLimiter),
        validateParams(schemas.getTopCrypto), 
        cache, 
        cryptoController.getTopCrypto
    )
    .get(
        '/crypto/:id/:cur?/:nbd?',
        rateLimit(schemas.cryptoLimiter),
        validateParams(schemas.getOneCrypto), 
        cache, 
        cryptoController.getOneCrypto
    )
    .get('/cryptos',
        rateLimit(schemas.cryptoLimiter),
        cache, 
        cryptoController.getAllCryptos
    )
    .get(
        '/trending',
        rateLimit(schemas.cryptoLimiter),
        cache, 
        cryptoController.getTrendingCryptos
    )
    .get(
        '/global',
        rateLimit(schemas.cryptoLimiter),
        cache, 
        cryptoController.getGlobalData
    )
    .get(
        '/history/:coinId/:day(\\d+)/:month(\\d+)/:year(\\d+)',
        rateLimit(schemas.cryptoLimiter),
        validateParams(schemas.getHistory), 
        cache, 
        cryptoController.getHistoricalData
    );

module.exports = router;