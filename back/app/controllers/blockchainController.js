const NativeTokenObject = require('../class/NativeTokenObject');
const service_fetch = require('../services/fetch');
const { blockchain } = require('../services');
const { ethers } = require('ethers');
const { Network } = require('../models');

require('dotenv').config();

const header = {headers: {'X-API-Key': `${process.env.MORALIS_API_KEY}`}};

module.exports = {
    getERC20Tokens: async (req, res, next) => {
        try {
            await blockchain.getWalletNetwork(req, res, next);
            await blockchain.getNativeToken(req, res, next);
            await blockchain.getWalletBalance(req, res, next);   
            await blockchain.getERC20Token(req, res, next);

            const whiteListToken = req.erc20Token.filter((token) => {
                if (req.whiteListAddress.includes(token.token_address)) {
                    token.change24h = req.tokensPrices[`${token.token_address}`][`${req.params.vs}_24h_change`]
                    token.price = req.tokensPrices[`${token.token_address}`][req.params.vs]
                    token.value = ethers.utils.formatEther(token.balance) * token.price
                    token.value24h = token.value / (1 + token.change24h / 100)
                    req.walletTotalBalance += token.value
                    return token
                }
            })
    
            for (const token of whiteListToken) {
                token.share = (token.value / req.walletTotalBalance) * 100;
            }
    
            const nativeTokenObject = new NativeTokenObject({
                name: req.network[0].name,
                symbol: req.network[0].symbol,
                balance: req.params.net,
                price: req.nativeTokenPrice,
                share: req.walletTotalBalance,
                thumbnail: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
                change24h: req.nativeTokenChange24h,
            })
    
            whiteListToken.push(nativeTokenObject)
            res.status(200).json(whiteListToken);
        } catch (err) {
            next(err);        
        }
    },

    getRangeWalletValue: async (req, res, next) => {
        try {

        } catch (err) {
            next(err);        
        }
    },

    getHistoryTransactionToken: async (req, res, next) => {
        try {
            const data = await service_fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress&address=${req.params.address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);
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