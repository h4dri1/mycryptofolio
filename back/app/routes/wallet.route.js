const { Router } = require('express');

const router = Router();

const { walletController } = require('../controllers');

const { schemas } = require('../schemas');   

const { jwtMW, guardMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush } = require('../services');

router
    .post(
        '/portfolio/wallet',
        rateLimit(schemas.transactionSchemaLim),
        jwtMW.routing,
        validateBody(schemas.walletSchema), 
        flush, 
        walletController.addWallet
    )
    .delete(
        '/portfolio/wallet/:wid(\\d+)', 
        jwtMW.routing,
        validateParams(schemas.deleteWalletSchema),
        guardMW.deleteWallet,
        flush,
        walletController.deleteWallet
    );

module.exports = router;