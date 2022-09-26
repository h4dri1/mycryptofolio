const { Router } = require('express');

const router = Router();

const { walletController } = require('../controllers');

const { schemas } = require('../schemas');   

const { auth, guardMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush } = require('../middlewares');

router
    .post(
        '/portfolio/wallet',
        rateLimit(schemas.transactionSchemaLim),
        auth.routing,
        validateBody(schemas.walletSchema), 
        flush, 
        walletController.addWallet
    )
    .delete(
        '/portfolio/wallet/:wid(\\d+)', 
        auth.routing,
        validateParams(schemas.deleteWalletSchema),
        guardMW.deleteWallet,
        flush,
        walletController.deleteWallet
    );

module.exports = router;