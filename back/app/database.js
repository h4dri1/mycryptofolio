const { Pool } = require('pg');
const { createClient } = require('redis');

const redis = createClient();

redis.on('error', () => {
    console.log('--> Database Cache Server DISCONNECTED !');
    process.exit()
});

redis.on('connect', () => {
    console.log('--> Database Cache Server Connected');
});

redis.connect();

const config = {
    connectionString: process.env.DATABASE_URL,
    allowExitOnIdle: true
}

const pool = new Pool(config)

pool.on('error', () => {
    console.error('--> Database Server DISCONNECTED !');
    process.exit();
});

pool.on('connect', () => {
    console.log('--> Database Server Connected');
});

module.exports = { pool, redis };