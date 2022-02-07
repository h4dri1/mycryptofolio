require('dotenv').config();

const express = require('express');

const cors = require('cors');

const router = require('./app/router');

const app = express();

const port = process.env.PORT || 5000;

const bodyParser = require('body-parser');

//const helmet = require('helmet');

const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
    info: {
      version: '1.0.0',
      title: 'Mycryptofolio-back',
      description: 'A crypto monitoring REST API',
      license: {
        name: 'MIT',
      },
    },
    security: {
      bearerAuth: {
        type: 'apiKey',
        name: 'access_token',
        scheme: 'bearer',
        in: 'header',
      },
    },
    baseDir: __dirname,
    filesPattern: './**/*.js',
    swaggerUIPath: '/api-docs',
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
};
  
expressJSDocSwagger(app)(options);

//app.disable('x-powered-by');
//
//app.use(helmet.xssFilter());
//
//app.use(helmet.frameguard({ action: 'deny' }));
//
//app.use(helmet.noSniff());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.all('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mycryptofolio.fr");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next()
});

app.use(express.json());

app.use('/v1', router);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});