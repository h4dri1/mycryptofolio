const { NativeTokenObject, Erc20TokensObject } = require('../class');
const service_fetch = require('../services/fetch');
const { blockchainService } = require('../services');
const { Network } = require('../models');

require('dotenv').config();

const header = {headers: {'X-API-Key': `${process.env.MORALIS_API_KEY}`}};

module.exports = {
    getERC20Tokens: async (req, res, next) => {
        try {  
            const tokens = await blockchainService.getERC20Token(req, res, next);

            res.status(200).json(tokens);
        } catch (err) {
            next(err);        
        }
    },

    getHistoryTransactionToken: async (req, res, next) => {
        try {
            const data = await service_fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress&address=${req.params.address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);
            
            //const icons = await service_fetch(`//deep-index.moralis.io/api/v2/erc20/metadata/symbols?chain=eth&symbols=`, header);
            for (const transaction of data.result) {
                if(transaction.from === req.params.address) {
                    transaction.type = 'send'
                } else if (transaction.to === req.params.address) {
                    transaction.type = 'receive'
                }
            }
            res.status(200).json(data); 
        } catch (err) {
            next(err);
        }
    },

    getNFTbyAddress: async (req, res, next) => {
        try {
            const network = await Network.getNetworkBychainId(req.params.network);
            const data = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/nft?chain=${network[0].hex}&format=decimal`, header);
            if (data.result.length === 0) {
                data.result = [{nft: 'no'}]
            }
            res.status(200).json(data.result); 
        } catch (err) {
            next(err);        
        }
    },

    getENSbyAddress: async (req, res, next) => {
        try {
            const data = await service_fetch(`//deep-index.moralis.io/api/v2/resolve/${req.params.address}/reverse`, header);
            res.status(200).json({name: data.name}); 
        } catch (err) {
            next(err);        
        }
    }
}; 