const { Router } = require('express');

const router = Router();

const { cryptoController } = require('../controllers');

const { schemas } = require('../schemas');

const { validateParams } = require('../middlewares');

const { cache } = require('../services');

router
    .get(
        '/index/fearandgreed', 
        cache, 
        cryptoController.getFearAndGreed
    )
    .get(
        '/cryptos/:vs/:nb(\\d+)', 
        validateParams(schemas.getTopCryptoSchema), 
        cache, 
        cryptoController.getTopCrypto
    )
    .get(
        '/crypto/:id/:cur?/:nbd?', 
        validateParams(schemas.getOneCryptoSchema), 
        cache, 
        cryptoController.getOneCrypto
    )
    .get('/cryptos', 
        cache, 
        cryptoController.getAllCryptos
    )
    .get(
        '/trending',
        cache, 
        cryptoController.getTrendingCryptos
    )
    .get(
        '/global', 
        cache, 
        cryptoController.getGlobalData
    )
    .get(
        '/history/:coinId/:day(\\d+)/:month(\\d+)/:year(\\d+)', 
        validateParams(schemas.getHistorySchema), 
        cache, 
        cryptoController.getHistoricalData
    )
    .get('/cryptoprice/:id/:vs/:include_market_cap?/:include_24hr_vol?/:include_24hr_change?/:include_last_updated_at?',
        validateParams(schemas.getOnePriceSchema),
        cache,
        cryptoController.getOnePrice
    );

module.exports = router;