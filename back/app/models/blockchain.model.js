const { NativeTokenObject, Erc20TokensObject } = require('../class');

class Blockchain {
    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static getERC20Tokens = async (walletData, next) => {
        try {
            const whiteListToken = walletData.erc20Token.filter((token) => walletData.whiteListAddress.includes(token.token_address)).map((token) => {
                return new Erc20TokensObject(walletData, token)
            })

            for (const token of whiteListToken) {
                token.share = (token.value / walletData.walletTotalBalance) * 100;
            }
    
            whiteListToken.push(new NativeTokenObject(walletData));

            return whiteListToken;
        } catch (err) {
            next(err);
        }
    }

}

module.exports = Blockchain;