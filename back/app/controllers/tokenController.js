const jwt = require('../services/jwt');
const { InvalidToken } = require('../services/error');

module.exports = {
    refresh: (req, res, next) => {
        try {
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            if (!refreshPayload.user) {
                res.status(401);
                throw new InvalidToken().message;
            }
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(refreshPayload.user, refreshPayload.wallet));
            res.status(200).json('token refresh ok');
        } catch (err) {
            next(err);
        };
    }
};