const { ethers } = require('ethers');

class NativeTokenObject {
    constructor(name, symbol, balance, price, share, thumbnail, change24h) {
        this.name = name;
        this.symbol = symbol;
        this.balance = balance;
        this.price = price;
        this.value = this.getNativeValue();
        this.share = this.getShare(share);
        this.thumbnail = thumbnail;
        this.change24h = change24h;
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