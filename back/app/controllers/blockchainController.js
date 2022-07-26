const { Crypto } = require('../models');
const service_fetch = require('../services/fetch');
const { ethers } = require('ethers');

require('dotenv').config();

module.exports = {
    getERC20Tokens: async (req, res, next) => {
        try {
            var newData = [];
            const mainToken = {}
            const data = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/erc20?chain=eth`, {headers: {
                'X-API-Key': `${process.env.MORALIS_API_KEY}`
            }});
            const walletBalance = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/balance?chain=eth`, {headers: {
                'X-API-Key': `${process.env.MORALIS_API_KEY}`
            }});
            const priceMainToken = await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=${req.params.vs.toLowerCase()}&include_24hr_change=true`)
            let sum = ethers.utils.formatEther(walletBalance.balance) * priceMainToken.ethereum[req.params.vs.toLowerCase()]
            for (const token of data) {
                const check = await Crypto.checkEthAddress(token.token_address);
                if (check) {
                    const curr = req.params.vs.toLowerCase();
                    const price = await service_fetch(`//api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token.token_address}&vs_currencies=${curr}&include_24hr_change=true`)
                    const priceToken = price[token.token_address];
                    const priceChange = price[token.token_address]
                    token.price = priceToken[curr];
                    const change24h = priceChange[`${curr}_24h_change`];
                    token.value = ethers.utils.formatEther(token.balance) * token.price
                    token.value24h = token.value / (1 + change24h / 100)
                    token.change24h = change24h
                    newData.push(token);
                    sum += token.value;
                } 
            }
            for (const token of newData) {  
                token.share = (token.value / sum) * 100;
            }
            mainToken.name = 'Ethereum';
            mainToken.symbol = 'ETH';
            mainToken.balance = walletBalance.balance;
            mainToken.price = priceMainToken.ethereum[req.params.vs.toLowerCase()];
            mainToken.value = ethers.utils.formatEther(walletBalance.balance) * mainToken.price;
            mainToken.share = (mainToken.value / sum) * 100;
            mainToken.thumbnail = 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880';
            mainToken.change24h = priceMainToken.ethereum.usd_24h_change;
            mainToken.value24h = mainToken.value / (1 + mainToken.change24h / 100)
            newData.push(mainToken);   
            res.status(200).json(newData);
        } catch (err) {
            next(err);        
        }
    }
};   