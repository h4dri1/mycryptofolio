const { Network, Blockchain, Crypto } = require('../models');
const service_fetch = require('./fetch');
const header = {headers: {'X-API-Key': `${process.env.MORALIS_API_KEY}`}};

module.exports = {
    
    getTokens: async (req, res, next) => {
        try {
            res.locals.walletNetwork = await Network.getNetworkBychainId(req.params.network);

            res.locals.nativeTokenPrice = (
                req.params.vs !== req.params.network 
                    ? await service_fetch(`//api.coingecko.com/api/v3/simple/price?ids=${res.locals.walletNetwork[0].coingecko_name}&vs_currencies=${req.params.vs}&include_24hr_change=true`)
                    : {}
            )

            res.locals.erc20Token = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/erc20?chain=${(res.locals.walletNetwork[0].hex)}`, header);
            
            res.locals.whiteListAddress = await Promise.all(
                res.locals.erc20Token.map(async (token) => {
                    if (await Crypto.checkEthAddress((res.locals.walletNetwork[0].symbol).toLowerCase(), token.token_address)) {
                        return token.token_address
                    }
                })
            )

            res.locals.whiteListTokens = res.locals.erc20Token.filter((token) => res.locals.whiteListAddress.includes(token.token_address))

            res.locals.tokensPrices = await service_fetch(
                `//api.coingecko.com/api/v3/simple/token_price/${res.locals.walletNetwork[0].name}?contract_addresses=${res.locals.whiteListAddress}&vs_currencies=${req.params.vs}&include_24hr_change=true`
            );

            const tokens = await Blockchain.getTokens(req, res, next);
            return tokens;
        } catch (err) {
            throw err;       
        }
    },

    getHistoryTransactionToken: async (req, res, next) => {
        try {
            const transactions = await service_fetch(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress&address=${req.params.address}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`);
            const history = await Blockchain.getHistoryTransactionToken(req, transactions, next);
            return history;
        } catch (err) {
            throw err;       
        }
    },

    getNFTbyAddress: async (req, res, next) => {
        try {
            const network = await Network.getNetworkBychainId(req.params.network);
            const nfts = await service_fetch(`//deep-index.moralis.io/api/v2/${req.params.address}/nft?chain=${network[0].hex}&format=decimal`, header);
            const nftList = await Blockchain.getNFTbyAddress(req, nfts, next);
            return nftList
        } catch (err) {
            throw err;       
        }
    },
    
    getENSbyAddress: async (req, res, next) => {
        try {
            const ens = await service_fetch(`//deep-index.moralis.io/api/v2/resolve/${req.params.address}/reverse`, header);
            const ensName = await Blockchain.getENSbyAddress(req, ens, next);
            return ensName
        } catch (err) {
            throw err;       
        }
    }
}

