const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500
    }
    if (!err.message) {
        err.message = 'error is not defined'
    }
    res.header("Content-Type", 'application/json')
    res.status(err.statusCode).send(JSON.stringify(err, null, 4))
}

module.exports = { errorLogger, errorResponder }