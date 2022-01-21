const jwt = require('../services/jwt');

module.exports = {
    refresh: (req, res) => {
        try {
            const refreshToken = req.params.token
            if (!refreshToken) {
                return res.status(401).json('Token Invalide !')
            }
            const refreshPayload = jwt.validateRefreshToken(refreshToken);
            console.log(refreshPayload);
            if (!refreshPayload.data) {
                return res.status(401).json('Invalid token');
            }
            const token = jwt.makeToken(refreshPayload.data);
            res.setHeader('Authorization', token);
            res.status(200).json('token refresh ok');
        } catch (error) {
            
        }
       
    }
}