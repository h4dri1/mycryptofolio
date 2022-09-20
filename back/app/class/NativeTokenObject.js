const { ethers } = require('ethers');

class NativeTokenObject {
    constructor(tokenObj) {
        this.name = tokenObj.networkName;
        this.symbol = tokenObj.networkSymbol;
        this.balance = tokenObj.balance;
        this.price = tokenObj.nativeTokenPrice;
        this.value = this.getNativeValue();
        this.share = this.getShare(tokenObj.walletTotalBalance);
        this.thumbnail = 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880';
        this.change24h = tokenObj.nativeTokenChange24h;
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