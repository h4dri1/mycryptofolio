const youShallNotPass = (req, res, next) => {
    console.log(req.hostname)
    next();
}

module.exports = youShallNotPass