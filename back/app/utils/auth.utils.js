const { redis } = require('../database');

const jwt = require('./jwt.utils');

// Require specific error

const { UseRevokedRefreshToken, InvalidToken } = require('../error/error');
const { AuthUtils } = require('../error/error.utils');

module.exports = {
  logout: async (req, res) => {
    // Case Logout
    try {
      // Remove the logout session refresh token
      const [sign] = req.params.token.split('.', 3).slice(-1);
      if (await redis.hExists(`${req.userId.id}`, sign)) {
        await redis.hDel(`${req.userId.id}`, sign);
      } else {
        throw new UseRevokedRefreshToken();
      }
      return res.status(200).json({ message: 'logout ok' });
    } catch (err) {
      if (!err.level) {
        throw new AuthUtils(err);
      } else {
        throw err;
      }
    }
  },

  checkRT: async (req) => {
    try {
      // Check Refresh Token in Redis
      const refreshPayload = jwt.validateRefreshToken(req.params.token);
      if (!refreshPayload.user) {
        throw new InvalidToken();
      }
      const [sign] = req.params.token.split('.', 3).slice(-1);
      // Check if the refresh token is in Redis
      // If it's not the case and if the token is valid the refresh token is revoked after logout
      if (!await redis.hExists(`${refreshPayload.user.id}`, sign)) {
        throw new UseRevokedRefreshToken();
      } else {
        return refreshPayload;
      }
    } catch (err) {
      throw new AuthUtils(err);
    }
  },
};
