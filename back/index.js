/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
require('dotenv').config();

// init express app on server.js

const { app } = require('./server');

// init host port in config.js

const { host, port } = require('./config');

app.listen(port, host, () => {
  console.log(`==> Run in ${process.env.NODE_ENV} environnement <==`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`--> Cors option ${process.env.LHOST}:8080`);
    console.log('--> Helmet Header Security OFF');
    console.log('--> Trust Proxy OFF');
    console.log('--> Log management verbose : maximum (error stack)');
  } else {
    console.log(`--> Cors option ${process.env.HOSTNAME}`);
    console.log('--> Helmet Header Security ON');
    console.log('--> Trust Proxy ON');
    console.log('--> Log management verbose : minimum');
  }
  console.log('--> Log folder : ./logs');
  console.log(`==> Server started on http://${host}:${port}`);
});
