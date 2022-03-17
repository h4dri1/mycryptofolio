require('dotenv').config();

const express = require('express')

const app = express();

const helmet = require('helmet');

var corsOptions = {
    origin: `https://${process.env.LHOST}:8080`,
    optionsSuccessStatus: 200
}

const port = process.env.LPORT || 5000;

const host = process.env.LHOST || 'localhost';

if (process.env.NODE_ENV === 'production') {
    var corsOptions = {
        origin: `https://${process.env.HOSTNAME}`,
        optionsSuccessStatus: 200
    }
    app.use(helmet());
    app.set('trust proxy', true);
}

module.exports = {app, port, host, corsOptions}