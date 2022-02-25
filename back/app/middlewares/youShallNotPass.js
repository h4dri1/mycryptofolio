const youShallNotPass = (req, res, next) => {
    console.log(req.ips)
    next();
}

module.exports = youShallNotPass