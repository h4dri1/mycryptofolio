const jwt = require('../services/jwt');

module.exports = {
    refresh: (req, res) => {
        try {
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            if (!refreshPayload) {
                return res.status(401).json('Token Invalide !');
            }
            console.log(refreshPayload)
            const token = jwt.makeToken(refreshPayload.user, refreshPayload.wallet);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', token);
            res.status(200).json('token refresh ok');
        } catch (error) {
            return res.status(401).json(error.message);
        };
    }
};