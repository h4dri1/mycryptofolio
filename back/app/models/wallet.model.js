/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-multi-str */
const { pool } = require('../database');
const { WalletModel } = require('../error/error.model');

class Wallet {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async findSumWallet(id) {
    try {
      const { rows } = await pool.query('SELECT wallet_id AS id, SUM (value) as "sum", wallet_label AS label FROM \
        coins_value_wallet WHERE coins_value_wallet.user_id=$1 GROUP BY wallet_label, wallet_id;', [id]);
      return rows.map((row) => new Wallet(row));
    } catch (err) {
      throw new WalletModel(err);
    }
  }

  static async findSumWalletByWallet(id, wid) {
    try {
      const { rows } = await pool.query('SELECT wallet_id AS id, SUM (value) as "sum", wallet_label AS label FROM \
        coins_value_wallet WHERE coins_value_wallet.user_id=$1 AND wallet_id=$2 GROUP BY wallet_label, wallet_id;', [id, wid]);
      return new Wallet(rows[0]);
    } catch (err) {
      throw new WalletModel(err);
    }
  }

  static async findWalletByUser(id) {
    try {
      const { rows } = await pool.query('SELECT id, label, user_id FROM wallet WHERE user_id=$1;', [id]);
      if (rows) {
        return rows.map((row) => new Wallet(row));
      }
      return null;
    } catch (err) {
      throw new WalletModel(err);
    }
  }

  async save() {
    try {
      if (this.id) {
        await pool.query('SELECT * FROM update_wallet($1)', [this]);
      } else {
        const { rows } = await pool.query('SELECT * FROM add_wallet($1)', [this]);
        if (rows) {
          this.id = rows[0].id;
          return this;
        }
      }
      return null;
    } catch (err) {
      throw new WalletModel(err);
    }
  }

  static async findWalletWithNoTransaction(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM wallet WHERE user_id=$1 AND id NOT IN (SELECT DISTINCT wallet_id FROM transaction);', [id]);
      if (rows) {
        return rows.map((row) => new Wallet(row));
      }
      return null;
    } catch (err) {
      throw new WalletModel(err);
    }
  }

  static async delete(id) {
    try {
      await pool.query('DELETE FROM wallet WHERE id=$1;', [id]);
    } catch (err) {
      throw new WalletModel(err);
    }
  }
}

module.exports = Wallet;
