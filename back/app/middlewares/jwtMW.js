const jwt = require('../services/jwt');
const { InvalidToken } = require('../error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            throw new InvalidToken();
        }
        const payload = jwt.validateToken(token);
        req.userId = payload.user;
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Authorization', jwt.makeToken(req.userId));
        next();
    } catch(err) {
        next(err)
    };
};