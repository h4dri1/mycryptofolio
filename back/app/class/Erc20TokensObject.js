const { ethers } = require('ethers');

class Erc20TokensObject {
    constructor(testObj) {
        this.name = testObj.name;
        this.symbol = testObj.symbol;
        this.balance = testObj.balance;
        this.price = testObj.price;
        this.value = this.getNativeValue();
        this.share = this.getShare(share);
        this.thumbnail = testObj.thumbnail;
        this.change24h = testObj.change24h;
        this.value24h = this.getValue24h();
    }

    getNativeValue() {
        return Number(ethers.utils.formatEther(this.balance)) * this.price; ;
    }

    getShare(share) {
        return (this.value / share) * 100;
    }

    getValue24h() {
        return this.value / (1 + this.change24h / 100);
    }
}

module.exports = Erc20TokensObject;