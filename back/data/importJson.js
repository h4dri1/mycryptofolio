require('dotenv').config();

const cliProgress = require('cli-progress');

const cryptos = require('./crypto.json');

const { pool } = require('../app/database');

const importData = async () => {
    console.log('Import Data into BDD')
    console.log('Remove present data and refresh id')
    console.log('Add Data to BDD may take long time')
    await pool.query('TRUNCATE TABLE crypto RESTART IDENTITY CASCADE;');
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar1.start(12676, 0);
    for (const crypto of cryptos) {
        await pool.query('INSERT INTO crypto(coin_id, symbol) VALUES($1, $2)', [crypto.id, crypto.symbol]);
        bar1.increment();
    }
    bar1.stop();
    console.log('Data import finish')
    pool.end();
    process.exit();
};

importData();