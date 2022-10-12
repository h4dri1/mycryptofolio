const { Router } = require('express');

const router = Router();

const { favoriteController } = require('../controllers');

const { schemas } = require('../schemas');   

const { auth, guardMW, validateBody, validateParams } = require('../middlewares');

const rateLimit = require('express-rate-limit');

const { flush, cache } = require('../middlewares');

router
    .get(
        '/favorite',
        rateLimit(schemas.walletLimiter),
        auth.routing,
        //validateBody(schemas.wallet), 
        cache, 
        favoriteController.getFavoriteByUserId
    )
    .post(
        '/favorite/:id', 
        rateLimit(schemas.walletLimiter),
        auth.routing,
        //validateParams(schemas.deleteWallet),
        //guardMW.deleteWallet,
        flush,
        favoriteController.addFavorite
    )
    .delete(
        '/favorite/:id',
        rateLimit(schemas.walletLimiter),
        auth.routing,
        //validateParams(schemas.deleteWallet),
        //guardMW.deleteWallet,
        flush,
        favoriteController.deleteFavorite
    );

module.exports = router;