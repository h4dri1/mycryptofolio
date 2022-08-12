const NativeTokenObject = require('../class/NativeTokenObject');
const service_fetch = require('../services/fetch');
const { ethers } = require('ethers');

require('dotenv').config();

module.exports = {
    getERC20Tokens: async (req, res, next) => {
        try {
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
    
            const nativeTokenObject = new NativeTokenObject(
                `${req.params.network === 'eth' ? 'Ethereum' : req.params.network}`, // name
                `${req.params.network === 'eth' ? 'ETH' : req.params.network.toUpperCase()}`, // symbol
                req.params.net, // balance
                `${req.params.vs !== req.params.network ? req.nativeTokenPrice.ethereum[req.params.vs] : 1}`, // price
                req.walletTotalBalance,// share
                'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880', //thumbnail
                req.params.vs !== req.params.network ? req.nativeTokenPrice.ethereum[`${req.params.vs}_24h_change`] : 0, // change24h
            )
    
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
            //const data = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/erc20/transfers?chain=eth`, {headers: {
            //    'X-API-Key': `${process.env.MORALIS_API_KEY}`
            //}});
            const data = await service_fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress&address=${req.params.address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=67SRGI5F63SEN48J1CIVGNFEGQQBQPCIIN`)
            res.status(200).json(data); 
        } catch (err) {
            next(err);
        }
    },

    getNFTbyAddress: async (req, res, next) => {
        try {
            const data = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/nft?chain=eth&format=decimal`, {headers: {
                'X-API-Key': `${process.env.MORALIS_API_KEY}`
            }});
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
            const data = await service_fetch(`//deep-index.moralis.io/api/v2/resolve/${req.params.address}/reverse`, {headers: {
                'X-API-Key': `${process.env.MORALIS_API_KEY}`
            }});
            res.status(200).json(data.name); 
        } catch (err) {
            next(err);        
        }
    }
}; 