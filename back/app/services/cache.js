const { redis } = require('../database')

const prefix = 'mycryptofolio:';

let timeout = 60;

let newKey;

const cache = async (req, res, next) => {
    if (req.url === '/cryptos') {
        timeout = 60 * 5;
    };

    newKey = `${prefix}${req.url}`

    if (req.userId) {
        newKey = `${prefix}${req.userId.id}:${req.url}`
    }

    const key = newKey;

    if (await redis.exists(key)) {
        const cachedString = await redis.get(key);
        const cachedValue = JSON.parse(cachedString);
        return res.json(cachedValue);    
    };

    const originalResponseJson = res.json.bind(res);

    res.json = async (data) => {
        const str = JSON.stringify(data);
        await redis.hSet('keys', key, key, {EX: timeout, NX: true});
        await redis.set(key, str, {EX: timeout, NX: true});
        originalResponseJson(data);
    }
    next();
}

const flush = async (req, res, next) => {
    const getAllKeys = await redis.hGetAll('keys');
    for (const key in getAllKeys) {
        await redis.del(key);
    }
    await redis.del('keys')
    next();
}

module.exports = {cache, flush};