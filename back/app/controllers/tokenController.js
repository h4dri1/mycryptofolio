const jwt = require('../services/jwt');
const { checkRT } = require('../services/auth');
const { User } = require('../models');

module.exports = {
    refresh: async (req, res, next) => {
        try {
            const refreshPayload = await checkRT(req, res);
            if (refreshPayload) {
                const user = await User.findById(refreshPayload.user);
                res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                res.setHeader('Authorization', jwt.makeToken(refreshPayload.user));
                res.status(201).json({nickname: user.nickname, email: user.email, picture: user.picture});
            }   
        } catch (err) {
            next(err);
        };
    }
};