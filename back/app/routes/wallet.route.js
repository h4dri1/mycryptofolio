const { Router } = require('express');

const router = Router();

const rateLimit = require('express-rate-limit');
const { walletController } = require('../controllers');

const { schemas } = require('../schemas');

const {
  auth, guardMW, validateBody, validateParams,
} = require('../middlewares');

const { flush } = require('../middlewares');

router
  .post(
    '/portfolio/wallet',
    rateLimit(schemas.walletLimiter),
    auth.routing,
    validateBody(schemas.wallet),
    flush,
    walletController.addWallet,
  )
  .delete(
    '/portfolio/wallet/:wid(\\d+)',
    rateLimit(schemas.walletLimiter),
    auth.routing,
    validateParams(schemas.deleteWallet),
    guardMW.deleteWallet,
    flush,
    walletController.deleteWallet,
  );

module.exports = router;
