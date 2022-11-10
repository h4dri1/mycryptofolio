/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { pool } = require('../database');
const { CryptoModel } = require('../error/error.model');

class Crypto {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async checkEthAddress(network, address) {
    try {
      const { rows } = await pool.query(`SELECT * FROM crypto WHERE ${network} = $1`, [address]);
      if (rows.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      throw new CryptoModel(err);
    }
  }

  static async findAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM crypto;');
      return rows.map((row) => new Crypto(row));
    } catch (err) {
      throw new CryptoModel(err);
    }
  }

  static async findOneCrypto(coin_id, symbol) {
    try {
      const { rows } = await pool.query('SELECT id FROM crypto WHERE coin_id=$1 and symbol=$2;', [coin_id, symbol]);
      return rows.map((row) => new Crypto(row));
    } catch (err) {
      throw new CryptoModel(err);
    }
  }

  static async getCryptoId(symbol) {
    try {
      const { rows } = await pool.query('SELECT coin_id FROM crypto WHERE symbol=$1;', [symbol]);
      return rows.map((row) => new Crypto(row));
    } catch (err) {
      throw new CryptoModel(err);
    }
  }

  static async updatePrice(cryptos) {
    try {
      const { rows } = await pool.query('SELECT * FROM update_price($1)', [cryptos]);
      return rows.map((row) => new Crypto(row));
    } catch (err) {
      throw new CryptoModel(err);
    }
  }

  static async updateTransactionBPrice(transac) {
    const { rows } = await pool.query('SELECT * FROM update_transaction_bprice($1)', [transac]);
    return rows.map((row) => new Crypto(row));
  }
}

module.exports = Crypto;
