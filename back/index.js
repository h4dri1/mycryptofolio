require('dotenv').config();

const express = require('express');

const cors = require('cors');

const router = require('./app/router');

const app = express();

const swaggerJSDoc = require("swagger-jsdoc");

const swaggerUi = require("swagger-ui-express");

const swaggerOptions = require('./app/docs/swaggerOptions');

const { errorMW } = require('./app/middlewares');

const helmet = require('helmet');

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const corsOptions = {
  origin: 'http://mycryptofolio.fr',
  optionsSuccessStatus: 200
}

const port = process.env.PORT || 5000;

const host = process.env.HOST || 'localhost';

app.use(helmet());

app.set('trust proxy', true)

app.use(cors(corsOptions));

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', router);

app.use(errorMW.errorLogger);

app.use(errorMW.errorResponder);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

app.listen(port, host, () => {
    console.log(`Server started on http://localhost:${port}`);
});