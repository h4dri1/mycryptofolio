const errorLogger = (err, req, res, next) => {
    console.error('\x1b[31m', err)
    next(err)
}

const errorResponder = (err, req, res, next) => {
    res.header("Content-Type", 'application/json')
    res.send(JSON.stringify(err, null, 4))
}

module.exports = { errorLogger, errorResponder }