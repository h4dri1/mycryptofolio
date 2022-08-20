const { Crypto, Network } = require('../models');
const service_fetch = require('../services/fetch');
const { ethers } = require('ethers');

require('dotenv').config();

const header = {headers: {'X-API-Key': `${process.env.MORALIS_API_KEY}`}};

module.exports = {
    getERC20Token: async (req, res, next) => {
        try {
            const walletBalance = Number(ethers.utils.formatEther(req.params.net))

            req.network = await Network.getNetworkBychainId(req.params.network);

            req.erc20Token = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/erc20?chain=${(req.network[0].hex)}`, header);

            req.nativeTokenPrice = (
                req.params.vs !== req.params.network 
                    ? await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${req.network[0].coingecko_name}&vs_currencies=${req.params.vs}&include_24hr_change=true`) 
                    : {}
            )
        
            req.whiteListAddress = await Promise.all(
                    req.erc20Token.map(async (token) => {
                        if (await Crypto.checkEthAddress((req.network[0].symbol).toLowerCase(), token.token_address)) {
                            return token.token_address
                        }
                    }
                )
            )

            req.tokensPrices = await service_fetch(
                `//api.coingecko.com/api/v3/simple/token_price/${req.network[0].name}?contract_addresses=${req.whiteListAddress}&vs_currencies=${req.params.vs}&include_24hr_change=true`
            );

            req.walletTotalBalance = req.params.vs !== req.params.network ? walletBalance * req.nativeTokenPrice[req.network[0].coingecko_name][req.params.vs] : walletBalance;
            
        } catch (err) {
            next(err);
        }
    },
    
    getNativeToken: async (req, res, next) => {
        try {

        } catch(err) {
            next(err)
        }

    }
}

