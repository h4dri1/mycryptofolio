const { ethers } = require('ethers');

class Erc20TokensObject {

    constructor(req, obj={}) {
        for (const propname in obj) {
            this[propname] = obj[propname];
        }

        this.change24h = this.getChange24h(req, obj)
        this.price = this.getPrice(req, obj)
        this.value = this.getValue()
        this.value24h = this.getValue24h()
        req.walletTotalBalance += this.value
    }

    getChange24h(req, obj) {
        return req.tokensPrices[`${obj.token_address}`][`${req.params.vs}_24h_change`]
    }

    getPrice(req, obj) {
        return req.tokensPrices[`${obj.token_address}`][req.params.vs]
    }

    getValue() {
        return ethers.utils.formatEther(this.balance) * this.price
    }

    getValue24h() {
        return this.value / (1 + this.change24h / 100)
    }
}

module.exports = Erc20TokensObject;