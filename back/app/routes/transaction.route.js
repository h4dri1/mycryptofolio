const { Router } = require('express');

const router = Router();

const { transactionController } = require('../controllers');

const { schemas } = require('../schemas');

const { auth, guardMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush } = require('../middlewares');

router
    .post(
        '/portfolio/wallet/:wid(\\d+)/transaction',
        rateLimit(schemas.transactionLimiter),
        auth.routing,
        validateBody(schemas.transaction),
        guardMW.transactionGuard, 
        flush,
        transactionController.addTransaction
    )
    .delete(
        '/portfolio/transaction/:tid(\\d+)',
        rateLimit(schemas.transactionLimiter),
        auth.routing,
        validateParams(schemas.deleteTransaction), 
        guardMW.deleteTransaction,
        flush,
        transactionController.deleteTransaction
    );

module.exports = router;