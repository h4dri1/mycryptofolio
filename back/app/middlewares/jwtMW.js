const jwt = require('../services/jwt');
const { InvalidToken, JWTError } = require('../services/error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            throw new InvalidToken();
        }
        const payload = jwt.validateToken(token);
        if (!payload.user) {
            throw new InvalidToken();
        }
        req.userId = payload.user;
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Authorization', jwt.makeToken(req.userId));
        next();
    } catch(err) {
        throw new JWTError(err.message);
    };
};