const { Router } = require('express');

const router = Router();

const { favoriteController } = require('../controllers');

const { schemas } = require('../schemas');   

const { auth, guardMW, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush, cache } = require('../middlewares');

router
    .get(
        '/favorite',
        rateLimit(schemas.walletLimiter),
        auth.routing,
        cache, 
        favoriteController.getFavoriteByUserId
    )
    .post(
        '/favorite/:id', 
        rateLimit(schemas.walletLimiter),
        auth.routing,
        validateParams(schemas.postFavorite),
        flush,
        favoriteController.addFavorite
    )
    .delete(
        '/favorite/:id',
        rateLimit(schemas.walletLimiter),
        auth.routing,
        validateParams(schemas.deleteFavorite),
        flush,
        favoriteController.deleteFavorite
    );

module.exports = router;