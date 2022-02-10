const jwt = require('../services/jwt');
const {createClient} = require('redis');
const db = createClient();
db.connect();

const prefix = 'mycryptofolio:';
let timeout = 60;

let key;

const keys = [];

const cache = async (req, res, next) => {
    if (req.url === '/cryptos') {
        timeout = 60 * 5;
    };

    if (req.userId) {
        key = `${prefix}:${req.userId.id}:${req.url}:${req.params}`;
    } else {
        key = `${prefix}${req.url}:${req.params}`;
    }

    console.log(key)

    if (await db.exists(key)) {
        const cachedString = await db.get(key);
        const cachedValue = JSON.parse(cachedString);
        if (req.userId) {
            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(req.userId));
        }
        console.log(cachedValue)
        return res.json(cachedValue);
    };

    const originalResponseJson = res.json.bind(res);

    res.json = async (data, err) => {
        if (!err) {
            const str = JSON.stringify(data);
            keys.push(key);
            await db.set(key, str, {EX: timeout, NX: true});
        }
        originalResponseJson(data);
    }
    next();
};

const flush = async (req, res, next) => {
    while(key=keys.shift()) {
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};