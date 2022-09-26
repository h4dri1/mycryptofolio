const { Router } = require('express');

const router = Router();

const { nftsController } = require('../controllers');

const { cache } = require('../middlewares');

router
    .get(
        '/nft/collections/:collection', 
        cache, 
        nftsController.getNFTCollection
    )
    .get(
        '/nft/collections/:collection',
        cache, 
        nftsController.getNFTCollection
    )
    .get('/nfts/top/:nb(\\d+)', 
        cache,
        nftsController.getTopNFT
    )

module.exports = router;