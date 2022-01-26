const {createClient} = require('redis');
const db = createClient();
db.connect();

const prefix = 'mycryptofolio:';
let timeout = 60 * 5;

let key;

const keys = [];

const cache = async (req, res, next) => {
    if (req.url.length > 8) {
        timeout = 60;
    };
    const key = `${prefix}${req.url}`;

    if (await db.exists(key)) {
        const cachedString = await db.get(key);
        const cachedValue = JSON.parse(cachedString);
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
        console.log(key);
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};