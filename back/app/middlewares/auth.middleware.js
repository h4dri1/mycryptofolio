const { redis } = require('../database');

const jwt = require('../utils/jwt.utils');

// Must require logger from Winston framework on errorMW because i use it after with bind function

const { logger } = require('./error.middleware');

// Require specific error

const { BanUser, InvalidToken } = require('../error/error');

// Bind original logger

const originalLogger = logger.log.bind(logger);

const { authUtils } = require('../utils');

module.exports = {
  // Signup Case new user
  signup: async (req, res, next) => {
    try {
      // Bind original response in Json
      const originalResponseJson = res.json.bind(res);
      // res.json is only used in the last controller if the new user is created
      // add a function to res.json for save refreshtoken in redis with user.Id for key
      // and send original response
      res.json = async (data) => {
        const [head, pay, sign] = data.refreshToken.split('.');
        const payload = jwt.validateRefreshToken(data.refreshToken.trim());
        await redis.hSet(`${payload.user.id}`, sign, data.refreshToken, { EX: 2592000, NX: true });
        originalResponseJson(data);
      };
      next();
    } catch (err) {
      next(err);
    }
  },
  // Login case
  login: async (req, res, next) => {
    try {
      // Redis variable
      const prefix = 'login:';
      const key = `${prefix}${req.body.email}`;
      const timeout = 60 * 30;
      // If the key already exist this is because user have already send a bad password
      if (redis.get(key)) {
        const cachedString = await redis.get(key);
        const cachedValue = JSON.parse(cachedString);
        // If the value is > 4 add an expired timeout of 30min to the redis key
        // eslint-disable-next-line max-len
        // The key exist during 30min so the user get an Ban error message during the validity of the key
        if (cachedValue > 4) {
          await redis.expire(key, timeout);
          throw new BanUser(req.ip);
        }
      }
      // Bind orginal response json
      const originalResponseJson = res.json.bind(res);
      // res.json is only used if the user send good credentials
      // Add a function to res.json
      // If user send good data remove the ban counter key
      // add new refresh token to redis
      // Send original json response
      res.json = async (data) => {
        if (redis.get(key)) {
          await redis.del(key);
        }
        const [head, pay, sign] = data.refreshToken.split('.');
        await redis.hSet(`${data.id}`, sign, data.refreshToken, { EX: 2592000, NX: true });
        originalResponseJson(data);
      };
      // Logger is only used in ErrorMW when app throw new error
      // If error.name = 'BadPassUser' the user send bad password
      // Add a function to logger.log
      // If the ban key doesn't exist in redis add the key
      // If the ban key exist in redis incr +1
      // Send original logger.log data
      logger.log = async (data) => {
        if (data && data.name === 'BadPassUser') {
          if (!await redis.get(key)) {
            await redis.set(key, 1);
          } else {
            await redis.incr(key);
          }
        }
        originalLogger(data);
      };
      next();
    } catch (err) {
      next(err);
    }
  },

  routing: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      let newToken = token;
      if (!token) {
        throw new InvalidToken();
      }
      // For Swagger doc
      if (token.includes('Bearer')) {
        newToken = token.replace('Bearer', '');
      }
      const payload = jwt.validateToken(newToken.trim());
      req.userId = payload.user;
      res.setHeader('Access-Control-Expose-Headers', 'Authorization');
      res.setHeader('Authorization', jwt.makeToken(req.userId));
      next();
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res, next) => {
    // Case Logout
    let tempToken;
    try {
      const refreshPayload = await authUtils.checkRT(req, res);
      if (refreshPayload) {
        tempToken = jwt.makeToken(refreshPayload.user);
      }
      const token = req.headers.authorization;
      if (!token) {
        throw new InvalidToken();
      }
      const payload = jwt.validateToken(token);
      req.userId = payload.user;
      next();
    } catch (err) {
      if (err.message === 'jwt expired') {
        if (tempToken) {
          const payload = jwt.validateToken(tempToken);
          req.userId = payload.user;
          next();
        }
      } else {
        next(err);
      }
    }
  },
};
