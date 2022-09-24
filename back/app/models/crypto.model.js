const { pool } = require('../database');
const { OneCryptoObject } = require('../objects');

class Crypto {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async getHistoricalData(history) {
        return new Crypto(history);
    }

    static async getGlobalData(marketData) {
        return new Crypto(marketData);
    }

    static async getFearAndGreed(data) {
        return new Crypto(data);
    }

    static async getTrendingCryptos(trending) {
        return new Crypto(trending);
    }

    static async topCryptos(cryptos) {
        return cryptos.map(row => new Crypto(row));
    }

    static async getOneCrypto(one, chart) {
        const rows = new Array({data: new OneCryptoObject(one), chart: chart});
        return new Crypto(rows)[0];
    }

    static async checkEthAddress(network, address) {
        const { rows } = await pool.query(`SELECT * FROM crypto WHERE ${network} = $1`, [address]);
        if (rows.length > 0) {
            return true;
        } else {
            return false;
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

    static async getCryptoId(symbol) {
        const {rows} = await pool.query('SELECT coin_id FROM crypto WHERE symbol=$1;', [symbol]);
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