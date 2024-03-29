/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-multi-str */
/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const { pool } = require('../database');
const { TransactionModel } = require('../error/error.model');

class Transaction {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async getTransactionByWallet(wid) {
    try {
      const { rows } = await pool.query('SELECT * FROM view_wallet_user_transaction WHERE wallet_id=$1;', [wid]);
      return rows.map((row) => new Transaction(row));
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  static async getUserCrypto(user_id) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        wallet_id, wallet_label, coin_id, symbol, \
        AVG(price) AS buy_price,\
        SUM (quantity) AS total, (AVG(price) * SUM(quantity)) AS investment\
        FROM \
        view_transaction \
        WHERE \
        user_id=$1 \
        GROUP BY \
        symbol, wallet_id, wallet_label, coin_id;',
        [user_id],
      );
      return rows.map((row) => new Transaction(row));
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  static async getUserCryptoByWallet(user_id, wallet_id) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        wallet_id, wallet_label, coin_id, symbol, \
        AVG(price) as buy_price, \
        SUM(quantity) AS total,\
        (AVG(price) * SUM(quantity)) AS investment\
        FROM \
        view_transaction \
        WHERE \
        user_id=$1 AND wallet_id=$2 \
        GROUP BY \
        wallet_id, wallet_label, symbol, coin_id;',
        [user_id, wallet_id],
      );
      return rows.map((row) => new Transaction(row));
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  static async getUserTransaction(user_id) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        id, symbol, buy, price, price_usd, price_eur, price_btc, price_eth, quantity, buy_date, fiat, wallet_id \
        FROM \
        view_transaction \
        WHERE \
        user_id=$1 \
        ORDER BY \
        buy_date DESC;',
        [user_id],
      );
      if (rows) {
        return new Transaction(rows);
      }
      return null;
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  static async getUserTransactionByWallet(user_id, wallet_id) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        id, symbol, buy, price, price_usd, price_eur, price_btc, price_eth, quantity, buy_date, fiat \
        FROM \
        view_transaction \
        WHERE \
        user_id=$1 AND wallet_id=$2 \
        ORDER BY \
        buy_date DESC;',
        [user_id, wallet_id],
      );
      return rows.map((row) => new Transaction(row));
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  static async getSumCoinByWalletWithSell(tid) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        transaction_id, wallet_id, user_id, coin_id, buy,\
        (SELECT quantity FROM view_transaction WHERE id=$1), \
        (SELECT COUNT (buy = false) FROM view_wallet_user_transaction WHERE buy=false AND \
        (SELECT coin_id FROM view_wallet_user_transaction WHERE transaction_id=$1)=coin_id) AS sell, \
        (SELECT SUM(quantity) FROM view_transaction WHERE \
        (SELECT coin_id FROM view_wallet_user_transaction WHERE transaction_id=$1)=coin_id AND wallet_id= \
        (SELECT wallet_id FROM view_wallet_user_transaction WHERE transaction_id=$1)) AS total\
        FROM \
        view_wallet_user_transaction \
        WHERE \
        transaction_id=$1 \
        GROUP BY \
        buy, transaction_id, wallet_id, user_id, coin_id;',
        [tid],
      );
      return rows.map((row) => new Transaction(row));
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  async save() {
    try {
      if (this.id) {
        await pool.query('SELECT * FROM update_transaction($1)', [this]);
      } else {
        const { rows } = await pool.query('SELECT * FROM add_transaction($1)', [this]);
        if (rows) {
          this.id = rows[0].id;
          return this;
        }
      }
      return null;
    } catch (err) {
      throw new TransactionModel(err);
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM transaction WHERE id=$1 RETURNING id;', [id]);
    } catch (err) {
      throw new TransactionModel(err);
    }
  }
}

module.exports = Transaction;
