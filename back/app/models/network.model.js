/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const { pool } = require('../database');

class Network {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async getNetworkBychainId(chainId) {
    const { rows } = await pool.query('SELECT * FROM network WHERE chainId = $1', [chainId]);
    return rows.map((row) => new Network(row));
  }
}

module.exports = Network;
