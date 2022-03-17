const { createLogger, format, transports } = require("winston");

const { UnExeptedError } = require('../error');

const errLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
}

// Use winston for logging error
// Winston config
const logger = createLogger({
    levels: errLevels,
    format: format.combine(format.timestamp(), format.json()),
    transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'logs/exceptions.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'logs/rejections.log' }),
    ],
});
// Winston error logger
// Log error on log files
const errorLogger = (err, req, res, next) => {
    // If production env doesn't send error stack
    if (process.env.NODE_ENV !== 'production' && !process.env.JEST_WORKER_ID) {
        console.error(err.stack)
    }
    if (!err.level) {
        logger.log(new UnExeptedError(err)); 
    } else {
        logger.log(err);
    }
    next(err);
}
// Error Responder
// Respond error to user
const errorResponder = (err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500
    }
    res.header("Content-Type", 'application/json');
    res.status(err.statusCode).send(JSON.stringify({message: err.message}, null, 4));
}

module.exports = { errorLogger, errorResponder, logger }