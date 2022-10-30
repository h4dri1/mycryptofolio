const { Router } = require('express');

const router = Router();

const rateLimit = require('express-rate-limit');
const { nftsController } = require('../controllers');

const { cache } = require('../middlewares');

const { schemas } = require('../schemas');

router
  .get(
    '/nftcollections/:collection',
    rateLimit(schemas.nftsLimiter),
    cache,
    nftsController.getNFTCollection,
  )
  .get(
    '/nfts/top/:nb(\\d+)',
    rateLimit(schemas.nftsLimiter),
    cache,
    nftsController.getTopNFT,
  );

module.exports = router;
