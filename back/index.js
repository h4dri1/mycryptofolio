require('dotenv').config();

const { app, host, port } = require('./config');

const { swaggerUi, swaggerSpec } = require('./app/docs/swagger')

const { errorMW } = require('./app/middlewares');

const start_mess = require('./startup');

const router = require('./app/router');

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', router);

app.use(errorMW.errorLogger);

app.use(errorMW.errorResponder);

app.use((_, res) => {
    res.status(404).json('404 Not found');
});

app.listen(port, host, () => {
  start_mess(host, port);
});