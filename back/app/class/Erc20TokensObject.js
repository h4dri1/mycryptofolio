const { ethers } = require('ethers');

class Erc20TokensObject {

    constructor(walletData, obj={}) {
        for (const propname in obj) {
            this[propname] = obj[propname];
        }

        this.change24h = this.getChange24h(walletData, obj)
        this.price = this.getPrice(walletData, obj)
        this.value = this.getValue()
        this.value24h = this.getValue24h()
        walletData.walletTotalBalance += this.value
    }

    getChange24h(walletData, obj) {
        return walletData.tokensPrices[`${obj.token_address}`][`${walletData.vsCurrency}_24h_change`]
    }

    getPrice(walletData, obj) {
        return walletData.tokensPrices[`${obj.token_address}`][walletData.vsCurrency]
    }

    getValue() {
        return ethers.utils.formatEther(this.balance) * this.price
    }

    getValue24h() {
        return this.value / (1 + this.change24h / 100)
    }
}

module.exports = Erc20TokensObject;