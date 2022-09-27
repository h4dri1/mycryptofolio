const { redis } = require('../database')

const jwt = require('./jwt.utils');

// Require specific error 

const {  UseRevokedRefreshToken, InvalidToken } = require('../error');

module.exports = {
    logout: async (req, res, next) => {
        // Case Logout
        try {
            // Remove the logout session refresh token
            const [head, pay, sign] = req.params.token.split('.')
            if (await redis.hExists(`${req.userId.id}`, sign)) {
                await redis.hDel(`${req.userId.id}`, sign);
            } else {
                throw new UseRevokedRefreshToken();
            }
            return res.status(200).json({message: 'logout ok'})
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = this;
                err.messageSafe = 'lougout error';
            } 
            throw err;
        }
    },

    checkRT: async (req, res, next) => {
        try {
            // Check Refresh Token in Redis
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            if (!refreshPayload.user) {
                throw new InvalidToken();
            }
            const [head, pay, sign] = req.params.token.split('.');
            // Check if the refresh token is in Redis
            // If it's not the case and if the token is valid the refresh token is revoked after logout
            if (!await redis.hExists(`${refreshPayload.user.id}`, sign)) {
                throw new UseRevokedRefreshToken();
            } else {
                return refreshPayload;
            }
        } catch (err) {
            if (!err.level) {
                err.level = 'error';
                err.name = 'checkRT.utils';
                err.messageSafe = 'token error';
            } 
            throw err
        }

    }
}

