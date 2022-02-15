const { jwt } = require('../services');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json('Invalid token');
        }
        const payload = jwt.validateToken(token);
        if (!payload.user) {
            return res.status(401).json('Invalid token');
        }
        req.userId = payload.user;
        next();
    } catch(error) {
        return res.status(401).json(error.message);
    };
};