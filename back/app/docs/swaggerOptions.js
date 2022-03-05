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
    apis: ['./app/docs/*.js'],
};

module.exports = swaggerOptions;