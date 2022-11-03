const { Transaction } = require('../models');
const { update } = require('../utils');

module.exports = async (req, res, next) => {
  // Get all cryptos owned by user
  // Fetch user's crypto price and add to db
  try {
    let cryptos;
    let transacs;
    let cur;
    if (req.params.wid) {
      cryptos = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
      transacs = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wid);
    } else {
      cryptos = await Transaction.getUserCrypto(req.userId.id);
      transacs = await Transaction.getUserTransaction(req.userId.id);
    }
    const strCryptos = cryptos.map((crypto) => crypto.coin_id);
    if (req.params.cur) {
      cur = req.params.cur.toLowerCase();
    } else {
      cur = 'usd';
    }
    await update.price(strCryptos, cur);
    // eslint-disable-next-line max-len
    if (Object.entries(transacs).find((element) => element[1].fiat.toLowerCase() !== cur) !== undefined) {
      await update.buyPrice(transacs, cur);
    }
    next();
  } catch (err) {
    next(err);
  }
};
