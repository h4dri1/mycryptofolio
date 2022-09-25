const { NativeTokenObject, Erc20TokensObject } = require('../objects');

class Blockchain {
    constructor(obj) {
        this.tokens = obj
    }

    static async getTokens(req, res, next) {
        const erc20Tokens = res.locals.whiteListTokens.map((token) => {
            return new Erc20TokensObject(req, res, token)
        })
        
        for (const token of erc20Tokens) {
            token.share = (token.value / res.locals.walletTotalBalance) * 100;
        }

        const tokens = new Array(new NativeTokenObject(req, res), ...erc20Tokens)

        return new Blockchain(tokens).tokens;
    }

    static async getHistoryTransactionToken(req, transactions, next) {
        for (const transaction of transactions.result) {
            if(transaction.from === req.params.address) {
                transaction.type = 'send'
            } else if (transaction.to === req.params.address) {
                transaction.type = 'receive'
            }
        }
        return new Blockchain(transactions).tokens;
    }

    static async getNFTbyAddress(req, nfts, next) {
        if (nfts.result.length === 0) {
            nfts.result = [{nft: 'no'}]
        }
        return new Blockchain(nfts.result).tokens;
    }

    static async getENSbyAddress(req, ens, next) {
        const ensName = {name: ens.name}
        return new Blockchain(ensName).tokens;
    }



}

module.exports = Blockchain;