require('dotenv').config();

const cryptos = require('./crypto.json');

const { pool } = require('../app/database');

const importData = async () => {
    await pool.query('TRUNCATE TABLE crypto RESTART IDENTITY CASCADE;');
    for (const crypto of cryptos) {
        await pool.query('INSERT INTO crypto(coin_id, symbol) VALUES($1, $2)', [crypto.id, crypto.symbol]);
    }
    db.end();
};

importData();