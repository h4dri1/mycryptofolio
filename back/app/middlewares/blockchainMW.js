const { Crypto } = require('../models');
const NativeTokenObject = require('../class/NativeTokenObject');
const service_fetch = require('../services/fetch');
const { ethers } = require('ethers');

require('dotenv').config();

const header = {headers: {'X-API-Key': `${process.env.MORALIS_API_KEY}`}};

module.exports = async (req, res, next) => {
    try {
        const walletBalance = Number(ethers.utils.formatEther(req.params.net))
        req.params.vs = req.params.vs.toLowerCase()

        req.erc20Token = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/erc20?chain=${req.params.network}`, header);

        req.nativeTokenPrice = (
            req.params.vs !== req.params.network 
                ? await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${req.params.network === 'eth' 
                    ? 'ethereum' 
                    : req.params.network}&vs_currencies=${req.params.vs}&include_24hr_change=true`) 
                : {}
            )
       
        req.whiteListAddress = await Promise.all(
                req.erc20Token.map(async (token) => {
                    if (await Crypto.checkEthAddress(token.token_address)) {
                        return token.token_address
                    }
                }
            )
        )

        req.tokensPrices = await service_fetch(
            `//api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${req.whiteListAddress}&vs_currencies=${req.params.vs}&include_24hr_change=true`
        );

        req.walletTotalBalance = req.params.vs !== req.params.network ? walletBalance * req.nativeTokenPrice.ethereum[req.params.vs] : walletBalance;

        next()
    } catch (err) {
        next(err);
    }
}

