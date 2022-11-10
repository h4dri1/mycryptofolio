/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-multi-str */
const { pool } = require('../database');
const { PortfolioModel } = require('../error/error.model');

class Portfolio {
  constructor(obj = {}) {
    for (const propName in obj) {
      this[propName] = obj[propName];
    }
  }

  static async getPerformance(id) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        SUM (investment) as investment, \
        SUM (value) as actual_value,\
        SUM (value) - SUM (investment) as pnl \
        FROM \
        coins_value \
        WHERE \
        user_id=$1;',
        [id],
      );
      return new Portfolio(rows[0]);
    } catch (err) {
      throw new PortfolioModel(err);
    }
  }

  static async getPerformanceByWallet(id, wid) {
    try {
      const { rows } = await pool.query(
        'SELECT \
          SUM (investment) as investment, \
          SUM (value) as actual_value, \
          SUM (value) - SUM (investment) as pnl \
          FROM \
          coins_value_wallet \
          WHERE \
          user_id=$1 AND wallet_id=$2;',
        [id, wid],
      );
      return new Portfolio(rows[0]);
    } catch (err) {
      throw new PortfolioModel(err);
    }
  }

  static async getDistribution(id) {
    try {
      const { rows } = await pool.query(
        'SELECT \
            name, coin_id, quantity, value, \
            (100 * coins_value.value) / (SELECT SUM(value) FROM coins_value WHERE user_id=$1 AND coins_value.quantity!=0) as distribution \
            FROM \
            coins_value \
            WHERE \
            quantity!=0 AND coins_value.user_id=$1\
            GROUP BY \
            name, coin_id, quantity, value;',
        [id],
      );
      return rows.map((row) => new Portfolio(row));
    } catch (err) {
      throw new PortfolioModel(err);
    }
  }

  static async getDistributionByWallet(id, wid) {
    try {
      const { rows } = await pool.query(
        'SELECT \
        name, coin_id, quantity, value, \
        (100 * coins_value_wallet.value) / (SELECT SUM(value) FROM coins_value_wallet WHERE user_id=$1 AND wallet_id=$2 AND coins_value_wallet.quantity!=0) AS distribution \
        FROM \
        coins_value_wallet \
        WHERE \
        quantity!=0 AND user_id=$1 AND wallet_id=$2 \
        GROUP BY \
        name, coin_id, quantity, value;',
        [id, wid],
      );
      return rows.map((row) => new Portfolio(row));
    } catch (err) {
      throw new PortfolioModel(err);
    }
  }
}

module.exports = Portfolio;
