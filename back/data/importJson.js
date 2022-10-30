require('dotenv').config();

const cliProgress = require('cli-progress');

const cryptos = require('./crypto.json');
const networks = require('./network.json');

const { pool } = require('../app/database');

const importData = async () => {
  console.log('Import Data into BDD');
  console.log('Remove present data and refresh id');
  console.log('Add Data to BDD may take long time');
  console.log('Adding cryptos');
  await pool.query('TRUNCATE TABLE crypto RESTART IDENTITY CASCADE;');
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(12688, 0);
  for (const crypto of cryptos) {
    await pool.query('INSERT INTO crypto(coin_id, symbol, eth, matic, bnb, avax, ftm) VALUES($1, $2, $3, $4, $5, $6, $7)', [crypto.id, crypto.symbol,
      crypto.platforms.ethereum ? crypto.platforms.ethereum : null,
      crypto.platforms.matic ? crypto.platforms.matic : null,
      crypto.platforms.bsc ? crypto.platforms.bsc : null,
      crypto.platforms.avax ? crypto.platforms.avax : null,
      crypto.platforms.ftm ? crypto.platforms.ftm : null,
    ]);
    bar1.increment();
  }
  console.log('Adding networks');
  for (const network of networks) {
    await pool.query('INSERT INTO network(name, coingecko_name, moralis_name, symbol, hex, chainId, network) VALUES($1, $2, $3, $4, $5, $6, $7)', [network.name, network.coingecko_name, network.moralis_name, network.symbol, network.hex, network.chainId, network.network]);
    bar1.increment();
  }
  bar1.stop();
  console.log('Data import finish');
  pool.end();
  process.exit();
};

importData();
