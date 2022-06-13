const jwt = require('../services/jwt');
const { InvalidToken } = require('../error');
const { checkRT } = require('../services/auth');

module.exports = {
    changing: (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            let newToken = token;
            if (!token) {
                throw new InvalidToken();
            }
            const payload = jwt.validateToken(newToken.trim());
            req.userId = payload.user;
            next();
        } catch (err) {
            next(err);
        }
    },

    routing : (req, res, next) => {
        try {
            const token = req.headers['authorization'];
            let newToken = token;
            if (!token) {
                throw new InvalidToken();
            }
            // For Swagger doc
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
    },

    logout : async (req, res, next) => {
        // Case Logout
        var tempToken;
        try {
            const refreshPayload = await checkRT(req, res);
            if (refreshPayload) {
                tempToken = jwt.makeToken(refreshPayload.user);
            }
            const token = req.headers['authorization'];
            if (!token) {
                throw new InvalidToken();
            }
            const payload  = jwt.validateToken(token);
            req.userId = payload.user;
            next();
        } catch (err) {
            if (err.message === 'jwt expired') {
                if (tempToken) {
                    const payload = jwt.validateToken(tempToken);
                    req.userId = payload.user;
                    next();
                }
            } else {
                next(err);
            }
        }
    }
}