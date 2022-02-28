const { createClient } = require('redis');
const db = createClient();
db.connect();

const jwt = require('./jwt');

const { logger } = require('../middlewares/errorMW')

const { BanUser, UseRevokedRefreshToken, BadGuy, InvalidToken } = require('../error');

module.exports = {
    login: async (req, res, next) => {
        const prefix = 'login:';
        const key = `${prefix}${req.body.email}`
        const timeout = 60 * 30;

        if (!await db.exists(key)) {
            
            const originalLogger = logger.log.bind(logger);

            logger.log = async (data) => {
                if (data && data.name === 'BadPassUser') {
                    await db.set(key, 1);
                }
                originalLogger(data);
            }

            const originalResponseJson = res.json.bind(res);

            res.json = async (data) => {
                const [head, pay, sign] = data.refreshToken.split('.')
                await db.hSet(`${data.id}`, sign, data.refreshToken, {EX: 2592000, NX: true});
                originalResponseJson(data);
            }
            next();
        } else {
            const cachedString = await db.get(key);
            const cachedValue = JSON.parse(cachedString);

            if (cachedValue > 4) {
                await db.expire(key, timeout)
                return res.json(new BanUser(req.ip));
            } else {
                const originalResponseJson = res.json.bind(res);

                const originalLogger = logger.log.bind(logger);

                logger.log = async (data) => {
                    if (data && data.name === 'BadPassUser') {
                        await db.incr(key);
                    }
                    originalLogger(data);
                }
                
                res.json = async (data) => {
                    await db.del(key);
                    const [head, pay, sign] = data.refreshToken.split('.')
                    await db.hSet(`${data.id}`, sign, data.refreshToken, {EX: 2592000, NX: true});
                    originalResponseJson(data);
                }
                next();
            }
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
            if (await db.hExists(`${req.userId.id}`, sign)) {
                await db.hDel(`${req.userId.id}`, sign);
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
        if (!await db.hExists(`${refreshPayload.user.id}`, sign)) {
            throw new UseRevokedRefreshToken();
        } else {
            return refreshPayload;
        }
    }
}

