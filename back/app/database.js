/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
const { Pool } = require('pg');
const { createClient } = require('redis');

const redis = createClient();

// Check Redis error connection

redis.on('error', () => {
  console.log('--> Database Cache Server DISCONNECTED !');
  process.exit();
});

redis.connect();

const config = {
  connectionString: process.env.DATABASE_URL,
  allowExitOnIdle: true,
};

// Postgresql Pool connection allow up to 100 connection at the same time

const pool = new Pool(config);

// Check postgresql connection error

pool.on('error', () => {
  console.error('--> Database Server DISCONNECTED !');
  process.exit();
});

module.exports = { pool, redis };
