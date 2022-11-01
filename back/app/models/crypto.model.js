/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { pool } = require('../database');

class Crypto {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async checkEthAddress(network, address) {
    const { rows } = await pool.query(`SELECT * FROM crypto WHERE ${network} = $1`, [address]);
    if (rows.length > 0) {
      return true;
    }
    return false;
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM crypto;');
    return rows.map((row) => new Crypto(row));
  }

  static async findOneCrypto(coin_id, symbol) {
    const { rows } = await pool.query('SELECT id FROM crypto WHERE coin_id=$1 and symbol=$2;', [coin_id, symbol]);
    return rows.map((row) => new Crypto(row));
  }

  static async getCryptoId(symbol) {
    const { rows } = await pool.query('SELECT coin_id FROM crypto WHERE symbol=$1;', [symbol]);
    return rows.map((row) => new Crypto(row));
  }

  static async updatePrice(cryptos) {
    const { rows } = await pool.query('SELECT * FROM update_price($1)', [cryptos]);
    return rows.map((row) => new Crypto(row));
  }

  static async updateTransactionBPrice(transac) {
    const { rows } = await pool.query('SELECT * FROM update_transaction_bprice($1)', [transac]);
    return rows.map((row) => new Crypto(row));
  }
}

module.exports = Crypto;
