const jwt = require('../services/jwt');
const { checkRT } = require('../services/auth');

module.exports = {
    refresh: async (req, res, next) => {
        try {
            const refreshPayload = await checkRT(req, res);
            if (refreshPayload) {
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', jwt.makeToken(refreshPayload.user));
                res.status(200).json('token refresh ok');
            }   
        } catch (err) {
            next(err);
        };
    }
};