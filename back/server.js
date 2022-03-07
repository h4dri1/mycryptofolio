require('dotenv').config();

const express = require('express');

const cors = require('cors');

const helmet = require('helmet');

const corsOptions = {
  origin: `http://${process.env.HOSTNAME}:${process.env.FRONT_PORT}`,
  optionsSuccessStatus: 200
}

const app = express();

const port = process.env.LPORT || 5000;

const host = process.env.LHOST || 'localhost';

if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
    app.set('trust proxy', true);
}

app.use(cors(corsOptions));

app.use(express.json());

module.exports = { app, host, port };