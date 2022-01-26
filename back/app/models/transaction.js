const db = require('../database');

class Transaction {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async getUserCrypto(user_id) {
        try {
            const {rows} = await db.query('SELECT coin_id, symbol, AVG(price) as buy_price, SUM (quantity) AS total FROM view_transaction WHERE user_id=$1 GROUP BY symbol, coin_id;', [user_id]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getUserTransaction(user_id) {
        try {
            const {rows} = await db.query('SELECT symbol, buy, price, quantity, buy_date \
            FROM view_transaction WHERE user_id=$1 ORDER BY buy_date DESC;', [user_id]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Transaction;