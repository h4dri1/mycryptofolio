const youShallNotPass = (req, res, next) => {
    console.log(req.originalUrl)
    next();
}

module.exports = youShallNotPass