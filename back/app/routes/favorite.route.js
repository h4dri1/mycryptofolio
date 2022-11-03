const { Router } = require('express');

const router = Router();

const rateLimit = require('express-rate-limit');
const { favoriteController } = require('../controllers');

const { schemas } = require('../schemas');

const { auth, validateParams } = require('../middlewares');

const { flush, cache } = require('../middlewares');

router
  .get(
    '/favorite',
    rateLimit(schemas.walletLimiter),
    auth.routing,
    cache,
    favoriteController.getFavoriteByUserId,
  )
  .post(
    '/favorite/:id',
    rateLimit(schemas.walletLimiter),
    auth.routing,
    validateParams(schemas.postFavorite),
    flush,
    favoriteController.addFavorite,
  )
  .delete(
    '/favorite/:id',
    rateLimit(schemas.walletLimiter),
    auth.routing,
    validateParams(schemas.deleteFavorite),
    flush,
    favoriteController.deleteFavorite,
  );

module.exports = router;
