const jwt = require('../services/jwt');
const { InvalidToken } = require('../error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        let newToken = token;
        if (!token) {
            throw new InvalidToken();
        }
        if (token.includes('Bearer')) {
            newToken = token.replace('Bearer', '')
        }
        const payload = jwt.validateToken(newToken.trim());
        req.userId = payload.user;
        res.setHeader('Access-Control-Expose-Headers', 'Authorization');
        res.setHeader('Authorization', jwt.makeToken(req.userId));
        next();
    } catch(err) {
        next(err)
    };
};