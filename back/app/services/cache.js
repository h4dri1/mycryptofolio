const {createClient} = require('redis');
const db = createClient();
db.connect();

const prefix = 'mycryptofolio:';
const timeout = 60 * 5;

let key;

const keys = [];

const cache = async (req, res, next) => {
    const key = `${prefix}${req.url}`;
    console.log(key);

    if (await db.exists(key)) {
        console.log('Redis !');
        const cachedString = await db.get(key);
        const cachedValue = JSON.parse(cachedString);
        return res.json(cachedValue);
    };

    console.log('Sauvegarde du code original de response.json');
    const originalResponseJson = res.json.bind(res);

    console.log('Redéfinition de response.json');
    res.json = async (data) => {
        console.log('Mise en cache des data');
        const str = JSON.stringify(data);
        keys.push(key);
        await db.set(key, str, {EX: timeout, NX: true});
        console.log('Envoie');
        originalResponseJson(data);
    }
    next();
};

const flush = async (req, res, next) => {
    console.log('Fushing cache');

    while(key=keys.shift()) {
        console.log(key);
        await db.del(key);
    }
    next();
}

module.exports = {cache, flush};