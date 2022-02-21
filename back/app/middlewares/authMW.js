const { createClient } = require('redis');
const db = createClient();
db.connect();

module.exports = async (req, res, next) => {
    try {
        const prefix = 'mycryptofolio:';
        newKey = `${prefix}${req.body.email}`;
        timeout = 60 * 30;
    
        const key = newKey;
    
        if (await db.exists(key)) {
            const cachedString = await db.get(key);
            const cachedValue = JSON.parse(cachedString); 
            const cts = cachedValue.count;
            if (cachedValue.count > 4) {
                cachedValue.message = 'You have try 5 times with bad credentials retry in 30min';
                return res.json(cachedValue);
            } else {
                console.error = async (_, data) => {
                    if (data.name === 'BadPassUser') {
                        data.count = cts + 1
                        if (data.count === 4) {
                            data.message = 'This is your last try, after that you have to wait 30min before you can try again';
                        }
                        const str = JSON.stringify(data);
                        await db.set(key, str, {EX: timeout});
                    }
                }
                next();
            }
        }

        console.error = async (_, data) => {
            data.count = 1
            const str = JSON.stringify(data);
            await db.set(key, str, {EX: timeout, NX: true});
        }
        next();
        
    } catch(err) {
        next(err)
    };
};