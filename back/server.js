require('dotenv').config();

const express = require('express');

const cors = require('cors');

// Swagger API Docs URL : http://localhost:8888/docs

const { swaggerUi, swaggerSpec } = require('./app/docs/swagger');

// Error Middleware

const { errorMW } = require('./app/middlewares');

const router = require('./app/router');

const { app, corsOptions } = require('./config');

app.use(cors(corsOptions));

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', router);

// Error Logger MW

app.use(errorMW.errorLogger);

// Error Responder MW

app.use(errorMW.errorResponder);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

module.exports = { app };