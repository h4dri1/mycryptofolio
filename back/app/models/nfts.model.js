const { pool } = require('../database');

class Nfts {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM nft;');
    return rows.map((row) => new Nfts(row));
  }
}

module.exports = Nfts;
