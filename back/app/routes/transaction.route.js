const { Router } = require('express');

const router = Router();

const { transactionController } = require('../controllers');

const { schemas } = require('../schemas');

const { jwtMW, guardMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush } = require('../services');

router
    .post(
        '/portfolio/wallet/:wid(\\d+)/transaction',
        rateLimit(schemas.transactionSchemaLim),
        jwtMW.routing,
        validateBody(schemas.transactionSchema),
        guardMW.transactionGuard, 
        flush,
        transactionController.addTransaction
    )
    .delete(
        '/portfolio/transaction/:tid(\\d+)', 
        jwtMW.routing,
        validateParams(schemas.deleteTransactionSchema), 
        guardMW.deleteTransaction,
        flush,
        transactionController.deleteTransaction
    );

module.exports = router;