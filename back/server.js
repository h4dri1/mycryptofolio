require('dotenv').config();

const express = require('express');

const cors = require('cors');

// Swagger API Docs URL : http://localhost:8888/docs

const { swaggerUi, swaggerSpec } = require('./app/docs/swagger');

// Error Middleware

const { errorMW } = require('./app/middlewares');

const { app, corsOptions } = require('./config');

app.use(cors(corsOptions));

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes

const fs = require('fs');
const routes_directory = require('path').resolve(__dirname) + '/app/routes/'

fs.readdirSync(routes_directory).forEach(route_file => {
  try {
    app.use('/v1', require(routes_directory + route_file.slice(0, -3)));
  } catch (error) {
    console.log(`Encountered Error initializing routes from ${route_file}`);
    console.log(error);
  }
});

// Error Logger MW

app.use(errorMW.errorLogger);

// Error Responder MW

app.use(errorMW.errorResponder);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

module.exports = { app };