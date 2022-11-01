/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { ethers } = require('ethers');
const NativeTokenObject = require('./nativeToken.object');

class Erc20TokensObject extends NativeTokenObject {
  constructor(req, res, obj = {}) {
    super(req, res);
    for (const propname in obj) {
      this[propname] = obj[propname];
    }

    this.change24h = this.getChange24h(req, res, obj);
    this.price = this.getPrice(req, res, obj);
    this.value = this.getValue();
    this.value24h = this.getValue24h();
    res.locals.walletTotalBalance = res.locals.walletTotalBalance
      ? res.locals.walletTotalBalance + this.getValue()
      : super.getNativeBalance(req, res) + this.getValue();
  }

  getChange24h(req, res) {
    return res.locals.tokensPrices[`${this.token_address}`][`${req.params.vs}_24h_change`];
  }

  getPrice(req, res) {
    return res.locals.tokensPrices[`${this.token_address}`][req.params.vs];
  }

  getValue() {
    return ethers.utils.formatEther(this.balance) * this.price;
  }

  getValue24h() {
    return this.value / (1 + this.change24h / 100);
  }
}

module.exports = Erc20TokensObject;
