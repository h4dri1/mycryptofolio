const { redis } = require('../database')

const jwt = require('./jwt');

// Must require logger from Winston framework on errorMW because i use it after with bind function

const { logger } = require('../middlewares/errorMW')

// Require specific error 

const { BanUser, UseRevokedRefreshToken, BadGuy, InvalidToken } = require('../error');

// Bind original logger

const originalLogger = logger.log.bind(logger);

module.exports = {
    // Signup Case new user
    signup: async (req, res, next) => {
        // Bind original response in Json
        const originalResponseJson = res.json.bind(res);
        // res.json is only used in the last controller if the new user is created
        // add a function to res.json for save refreshtoken in redis with user.Id for key
        // and send original response  
        res.json = async (data) => {
            const [head, pay, sign] = data.refreshToken.split('.');
            const payload = jwt.validateRefreshToken(data.refreshToken.trim());
            await redis.hSet(`${payload.user.id}`, sign, data.refreshToken, {EX: 2592000, NX: true});
            originalResponseJson(data);
        }
        next();
    },
    // Login case
    login: async (req, res, next) => {
        try {
            // Redis variable
            const prefix = 'login:';
            const key = `${prefix}${req.body.email}`
            const timeout = 60 * 30;
            // If the key already exist this is because user have already send a bad password
            if (redis.get(key)) {
                const cachedString = await redis.get(key);
                const cachedValue = JSON.parse(cachedString);
                // If the value is > 4 add an expired timeout of 30min to the redis key
                // The key exist during 30min so the user get an Ban error message during the validity of the key
                if (cachedValue > 4) {
                    await redis.expire(key, timeout)
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
                const [head, pay, sign] = data.refreshToken.split('.')
                await redis.hSet(`${data.id}`, sign, data.refreshToken, {EX: 2592000, NX: true});
                originalResponseJson(data);
            }
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
            }
            next();
        } catch (err) {
            next(err)
        }
    },

    logout: async (req, res, next) => {
        // Case Logout
        try {
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            if (!refreshPayload.user) {
                throw new InvalidToken();
            }
            // If an User try to logout with a refresh token who differ whith the access token
            if (refreshPayload.user.id !== req.userId.id) {
                throw new BadGuy(req.ip);
            }
            // Remove the logout session refresh token
            const [head, pay, sign] = req.params.token.split('.')
            if (await redis.hExists(`${req.userId.id}`, sign)) {
                await redis.hDel(`${req.userId.id}`, sign);
            }
            return res.status(200).json({message: 'logout ok'})
        } catch (err) {
            next(err);
        }
    },

    checkRT: async (req, res, next) => {
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
    }
}

