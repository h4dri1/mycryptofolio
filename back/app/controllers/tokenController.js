const jwt = require('../services/jwt');

module.exports = {
    refresh: (req, res) => {
        try {
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            console.log(refreshPayload);
            if (!refreshPayload.data) {
                return res.status(401).json('Token Invalide !');
            }
            const token = jwt.makeToken(refreshPayload.data);
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', token);
            res.status(200).json('token refresh ok');
        } catch (error) {
            return res.status(401).json(error.message);
        };
    }
};