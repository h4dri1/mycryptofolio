const { Router } = require('express');

const router = Router();

const { blockchainController } = require('../controllers');

const { cache } = require('../services');

const rateLimit = require('express-rate-limit');

const { schemas } = require('../schemas');
const { validateParams } = require('../middlewares');

router
    .get(
        '/tokens/history/:address',
        rateLimit(schemas.blockchainLimiter),
        validateParams(schemas.getHistoryTransactionToken),
        cache, 
        blockchainController.getHistoryTransactionToken
    )
    .get(
        '/token/:address/:vs/:net?/:network?', 
        rateLimit(schemas.blockchainLimiter),
        validateParams(schemas.getERC20Tokens),
        cache, 
        blockchainController.getTokens
    )
    .get(
        '/nft/:address/:network', 
        rateLimit(schemas.blockchainLimiter),
        validateParams(schemas.getNFTbyAddress),
        cache, 
        blockchainController.getNFTbyAddress
    )
    .get(
        '/ens/:address', 
        rateLimit(schemas.blockchainLimiter),
        validateParams(schemas.getENSbyAddress),
        cache, 
        blockchainController.getENSbyAddress
    )

module.exports = router;