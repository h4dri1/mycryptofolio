const { ethers } = require('ethers');

class NativeTokenObject {
    constructor(tokenObj) {
        this.name = tokenObj.name;
        this.symbol = tokenObj.symbol;
        this.balance = tokenObj.balance;
        this.price = tokenObj.price;
        this.value = this.getNativeValue();
        this.share = this.getShare(tokenObj.share);
        this.thumbnail = tokenObj.thumbnail;
        this.change24h = tokenObj.change24h;
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

module.exports = NativeTokenObject;