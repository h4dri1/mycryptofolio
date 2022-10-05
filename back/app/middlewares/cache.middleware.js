const { redis } = require('../database')

const { CacheMiddleware } = require('../error/error.middleware')

const prefix = 'mycryptofolio:';

let timeout = 120;

let newKey;

const cache = async (req, res, next) => {
    try {
        // cryptos route is for getting 12 000+ crypto list from DB
        // The default expired times for redis data is 60s for other cryptos route
        // But for this one who doesn't change often we can set 5min
        if (req.url === '/cryptos') {
            timeout = 60 * 5;
        };
        // Redis Key
        newKey = `${prefix}${req.url}`
        
        // Specific Redis Key for connected user
        // This is for prevent user from viewing some cached data from other user on the same path/key
        if (req.userId) {
            newKey = `${prefix}${req.userId.id}:${req.url}`
        }
        
        const key = newKey;

        // If key exist send data from redis
        if (await redis.exists(key)) {
            const cachedString = await redis.get(key);
            const cachedValue = JSON.parse(cachedString);
            return res.json(cachedValue);    
        };
        // Else bind original response.json
        const originalResponseJson = res.json.bind(res);
        // res.json is only used in the last controller when response data
        // Add function to res.json
        // Add key in an array of key in redis
        // Add data who will be sending by controller to redis when res.json is call
        // Send original data
        res.json = async (data) => {
            const str = JSON.stringify(data);
            await redis.hSet('keys', key, key, {EX: timeout, NX: true});
            await redis.set(key, str, {EX: timeout, NX: true});
            originalResponseJson(data);
        }
        next();
    } catch(err) {
        next(err)
    }

}

const flush = async (req, res, next) => {
    // Flush data from Redis
    try {
        // Get all key in the key array
        // Del all key in Redis
        const getAllKeys = await redis.hGetAll('keys');
        for (const key in getAllKeys) {
            await redis.del(key);
        }
        await redis.del('keys')
        next();
    } catch(err) {
        next(err)
    }
}

module.exports = {cache, flush};