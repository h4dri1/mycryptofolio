const { ethers } = require('ethers');

class NativeTokenObject {
  constructor(req, res) {
    this.name = res.locals.walletNetwork[0].name;
    this.symbol = (res.locals.walletNetwork[0].symbol).toLowerCase();
    this.balance = req.params.net;
    this.price = this.getNativeTokenPrice(req, res);
    this.value = this.getNativeValue();
    this.change24h = this.getNativeTokenChange24h(req, res);
    this.value24h = this.getValue24h();
    this.share = this.getShare(req, res);
    this.thumbnail = 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880';
  }

  getNativeTokenChange24h(req, res) {
    return req.params.vs !== res.locals.walletNetwork[0].symbol ? res.locals.nativeTokenPrice[res.locals.walletNetwork[0].coingecko_name][`${req.params.vs}_24h_change`] : 0;
  }

  getNativeTokenPrice(req, res) {
    return req.params.vs !== res.locals.walletNetwork[0].symbol ? res.locals.nativeTokenPrice[res.locals.walletNetwork[0].coingecko_name][req.params.vs] : 1;
  }

  getNativeValue() {
    return Number(ethers.utils.formatEther(this.balance)) * this.price;
  }

  getShare(req, res) {
    return (this.value / res.locals.walletTotalBalance) * 100;
  }

  getValue24h() {
    return this.value / (1 + this.change24h / 100);
  }

  getNativeBalance(req, res) {
    const walletBalance = Number(ethers.utils.formatEther(req.params.net));
    return req.params.vs !== req.params.network ? walletBalance * this.getNativeTokenPrice(req, res) : walletBalance;
  }
}

module.exports = NativeTokenObject;
