const { Pool } = require('pg');
const { createClient } = require('redis');

const redis = createClient();
redis.connect();

const config = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(config);

module.exports = {pool, redis};