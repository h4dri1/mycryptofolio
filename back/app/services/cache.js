const { redis } = require('../database')

const prefix = 'mycryptofolio:';

let timeout = 60;

const keys = [];

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
        keys.push(key);
        await redis.set(key, str, {EX: timeout, NX: true});
        originalResponseJson(data);
    }
    next();
}

const flush = async (req, res, next) => {
    let key;
    while(key=keys.shift()) {
        await redis.del(key);
    }
    next();
}

module.exports = {cache, flush};