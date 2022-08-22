const jwt = require('../services/jwt');
const { checkRT } = require('../services/auth');
const { User } = require('../models')

module.exports = {
    refresh: async (req, res, next) => {
        try {
            const refreshPayload = await checkRT(req, res);
            if (refreshPayload) {
                const userData = await User.findById(refreshPayload.user.id);
                const userObj= {
                    id: userData.id
                }
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', jwt.makeToken(userObj));
                res.status(201).json({
                    id: userData.id, 
                    nickname: userData.nickname,
                    email: userData.email, 
                    picture: userData.picture, 
                    currency: userData.currency, 
                    verify: userData.verify
                });
            }   
        } catch (err) {
            next(err);
        };
    }
}; 