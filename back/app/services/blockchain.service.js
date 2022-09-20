const { Network, Blockchain, Crypto } = require('../models');
const service_fetch = require('./fetch');
const { ethers } = require('ethers');

module.exports = {
    getERC20Token: async (req, res, next) => {
        try {
            const header = {headers: {'X-API-Key': `${process.env.MORALIS_API_KEY}`}};

            const walletNetwork = await Network.getNetworkBychainId(req.params.network);

            const walletData = {
                walletAddress: req.params.address,
                walletNetwork: walletNetwork[0].hex,
                vsCurrency: req.params.vs,
                networkName: walletNetwork[0].name,
                networkSymbol: (walletNetwork[0].symbol).toLowerCase(),
                balance: req.params.net
            }

            const nativeTokenPrice = (
                req.params.vs !== req.params.network 
                    ? await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${walletNetwork[0].coingecko_name}&vs_currencies=${req.params.vs}&include_24hr_change=true`) 
                    : {}
            )

            walletData.nativeTokenPrice = req.params.vs !== walletNetwork[0].symbol ? nativeTokenPrice[walletNetwork[0].coingecko_name][req.params.vs] : 1
            walletData.nativeTokenChange24h = req.params.vs !== walletNetwork[0].symbol ? nativeTokenPrice[walletNetwork[0].coingecko_name][`${req.params.vs}_24h_change`] : 0

            const walletBalance = Number(ethers.utils.formatEther(req.params.net))
            walletData.walletTotalBalance = req.params.vs !== req.params.network ? walletBalance * walletData.nativeTokenPrice : walletBalance;

            walletData.erc20Token = await service_fetch(`//deep-index.moralis.io/api/v2/${walletData.walletAddress}/erc20?chain=${(walletData.walletNetwork)}`, header);

            walletData.whiteListAddress = await Promise.all(
                    walletData.erc20Token.map(async (token) => {
                        if (await Crypto.checkEthAddress((walletData.networkSymbol), token.token_address)) {
                            return token.token_address
                        }
                    }
                )
            )
            
            walletData.tokensPrices = await service_fetch(
                `//api.coingecko.com/api/v3/simple/token_price/${walletData.networkName}?contract_addresses=${walletData.whiteListAddress}&vs_currencies=${walletData.vsCurrency}&include_24hr_change=true`
            );

            const erc20tokens = await Blockchain.getERC20Tokens(walletData, next);
            
            return erc20tokens;
        } catch (err) {
            next(err);
        }
    }
}

