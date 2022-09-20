const { Router } = require('express');

const router = Router();

const { blockchainController } = require('../controllers');

const { cache } = require('../services');

router
    .get('/tokens/history/:address', cache, blockchainController.getHistoryTransactionToken)
    .get('/token/:address/:vs/:net?/:network?', cache, blockchainController.getERC20Tokens)
    .get('/nft/:address/:network', cache, blockchainController.getNFTbyAddress)
    .get('/ens/:address', cache, blockchainController.getENSbyAddress)

module.exports = router;