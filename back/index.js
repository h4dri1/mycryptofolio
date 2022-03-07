require('dotenv').config();

const { app, host, port } = require('./config');

const { swaggerUi, swaggerSpec } = require('./app/docs/swagger')

const { errorMW } = require('./app/middlewares');

const router = require('./app/router');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', router);

app.use(errorMW.errorLogger);

app.use(errorMW.errorResponder);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

app.listen(port, host, () => {
    console.log(`Run in ${process.env.NODE_ENV} environnement`);
    if (process.env.NODE_ENV === 'dev') {
      console.log(`--> Cors option ${process.env.HOSTNAME}`);
      console.log(`--> Helmet Header Security OFF`);
      console.log(`--> Trust Proxy OFF`);
      console.log(`--> Log management verbose : maximum (error stack)`);
    } else {
      console.log(`--> Cors option ${process.env.HOSTNAME}`);
      console.log(`--> Helmet Header Security ON`);
      console.log(`--> Trust Proxy ON`);
      console.log(`--> Log management verbose : minimum`);
    }
    console.log(`--> Server started on http://${host}:${port}`);
});