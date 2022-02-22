const jwt = require('../services/jwt');
const { InvalidToken } = require('../error');

module.exports = {
    refresh: (req, res, next) => {
        try {
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            if (!refreshPayload.user) {
                throw new InvalidToken();
            }
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(refreshPayload.user));
            res.status(200).json('token refresh ok');
        } catch (err) {
            next(err);
        };
    }
};