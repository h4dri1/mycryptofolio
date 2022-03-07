const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        version: '1.0.0',
        title: 'Mycryptofolio-API',
        description: 'A crypto monitoring REST API',
        license: {
          name: 'MIT',
        },
      },
      basePath: '/',
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT',
          }
        }
      }
    },
    apis: ['./app/docs/portfolio/*.js', './app/docs/cryptos/*.js', './app/docs/auth/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {swaggerSpec, swaggerUi}