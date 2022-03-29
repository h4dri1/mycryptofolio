const { pool } = require('../database');

class Crypto {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        const {rows} = await pool.query('SELECT * FROM crypto;');
        return rows.map(row => new Crypto(row));
    }

    static async findOneCrypto(coin_id, symbol) {
        const {rows} = await pool.query('SELECT id FROM crypto WHERE coin_id=$1 and symbol=$2;', [coin_id, symbol]);
        return rows.map(row => new Crypto(row));
    }
    
    static async updatePrice(cryptos) {
        const {rows} = await pool.query('SELECT * FROM update_price($1)', [cryptos]);
        return rows.map(row => new Crypto(row));
    }

    static async updateTransactionBPrice(transac) {
        const {rows} = await pool.query('SELECT * FROM update_transaction_bprice($1)', [transac]);
        return rows.map(row => new Crypto(row));
    }
}

module.exports = Crypto;