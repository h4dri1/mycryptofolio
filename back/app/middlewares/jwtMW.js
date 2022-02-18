const jwt = require('../services/jwt');
const { InvalidToken } = require('../services/error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            throw new InvalidToken().message;
        }
        const payload = jwt.validateToken(token);
        if (!payload.user) {
            throw new InvalidToken().message;
        }
        req.userId = payload.user;
        next();
    } catch(err) {
        next(err);
    };
};