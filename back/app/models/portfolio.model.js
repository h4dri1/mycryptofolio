const { pool } = require('../database');

class Transaction {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async getPerformance(id) {
        const {rows} = await pool.query(
        'SELECT \
        SUM (investment) as investment, \
        SUM (value) as actual_value,\
        SUM (value) - SUM (investment) as pnl \
        FROM \
        coins_value \
        WHERE \
        user_id=$1;', 
        [id]
        );
        return new Transaction(rows[0]);
    }

    static async getPerformanceByWallet(id, wid) {
        const {rows} = await pool.query(
        'SELECT \
        SUM (investment) as investment, \
        SUM (value) as actual_value, \
        SUM (value) - SUM (investment) as pnl \
        FROM \
        coins_value_wallet \
        WHERE \
        user_id=$1 AND wallet_id=$2;', 
        [id, wid]
        );
        return new Transaction(rows[0]);
    }

    static async getDistribution(id) {
        const {rows} = await pool.query(
        'SELECT \
        name, quantity, value, \
        (100 * coins_value.value) / (SELECT SUM(value) FROM coins_value WHERE user_id=$1 AND coins_value.quantity!=0) as distribution \
        FROM \
        coins_value \
        WHERE \
        quantity!=0 AND coins_value.user_id=$1\
        GROUP BY \
        name, quantity, value;', 
        [id]
        );
        return rows.map(row => new Transaction(row));
    }

    static async getDistributionByWallet(id, wid) {
        const {rows} = await pool.query(
        'SELECT \
        name, quantity,  value, \
        (100 * coins_value_wallet.value) / (SELECT SUM(value) FROM coins_value_wallet WHERE user_id=$1 AND wallet_id=$2 AND coins_value_wallet.quantity!=0) AS distribution \
        FROM \
        coins_value_wallet \
        WHERE \
        quantity!=0 AND user_id=$1 AND wallet_id=$2 \
        GROUP BY \
        name, quantity, value;', 
        [id, wid]
        );
        return rows.map(row => new Transaction(row));
    }
}

module.exports = Transaction;