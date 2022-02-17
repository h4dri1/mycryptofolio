const db = require('../database');

class Crypto {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const {rows} = await db.query('SELECT * FROM crypto;');
            if (rows) {
                return rows.map(row => new Crypto(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async findOneCrypto(coin_id, symbol) {
        try {
            const {rows} = await db.query('SELECT id FROM crypto WHERE coin_id=$1 and symbol=$2;', [coin_id, symbol]);
            if (rows) {
                return rows.map(row => new Crypto(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    static async updatePrice(cryptos) {
        try {
            const {rows} = await db.query('SELECT * FROM update_price($1)', [cryptos]);
            if (rows) {
                return rows.map(row => new Crypto(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Crypto;