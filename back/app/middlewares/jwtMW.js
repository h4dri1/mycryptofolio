const jwt = require('../services/jwt');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log(token);
        if (!token) {
            return res.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        if (!payload.data) {
            return res.status(401).json('Invalid token');
        }
        req.userId = payload.data;
        next();
    } catch(error) {
        return res.status(401).json(error.message);
    };
};