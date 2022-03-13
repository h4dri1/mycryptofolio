require('dotenv').config();

const express = require('express');

const cors = require('cors');

const helmet = require('helmet');

const { swaggerUi, swaggerSpec } = require('./app/docs/swagger')

const { errorMW } = require('./app/middlewares');

const router = require('./app/router');

const corsOptions = {
  origin: `https://${process.env.HOSTNAME}:${process.env.FRONT_PORT}`,
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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', router);

app.use(errorMW.errorLogger);

app.use(errorMW.errorResponder);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

module.exports = { app, host, port };