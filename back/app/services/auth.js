const { redis } = require('../database')

const jwt = require('./jwt');

const { logger } = require('../middlewares/errorMW')

const { BanUser, UseRevokedRefreshToken, BadGuy, InvalidToken } = require('../error');

const originalLogger = logger.log.bind(logger);

module.exports = {
    login: async (req, res, next) => {
        try {
            const prefix = 'login:';
            const key = `${prefix}${req.body.email}`
            const timeout = 60 * 30;

            if (redis.get(key)) {
                const cachedString = await redis.get(key);
                const cachedValue = JSON.parse(cachedString);
    
                if (cachedValue > 4) {
                    await redis.expire(key, timeout)
                    throw new BanUser(req.ip);
                }
            }

            const originalResponseJson = res.json.bind(res);
                    
            res.json = async (data) => {
                if (redis.get(key)) {
                    await redis.del(key);
                }
                const [head, pay, sign] = data.refreshToken.split('.')
                await redis.hSet(`${data.id}`, sign, data.refreshToken, {EX: 2592000, NX: true});
                originalResponseJson(data);
            }

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
        try {
            const refreshPayload = jwt.validateRefreshToken(req.params.token);
            if (!refreshPayload.user) {
                throw new InvalidToken();
            }
            if (refreshPayload.user.id !== req.userId.id) {
                throw new BadGuy(req.ip);
            }
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
        const refreshPayload = jwt.validateRefreshToken(req.params.token);
        if (!refreshPayload.user) {
            throw new InvalidToken();
        }
        const [head, pay, sign] = req.params.token.split('.');
        if (!await redis.hExists(`${refreshPayload.user.id}`, sign)) {
            throw new UseRevokedRefreshToken();
        } else {
            return refreshPayload;
        }
    }
}

