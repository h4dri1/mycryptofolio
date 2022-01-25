const db = require('../database');

class Crypto {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findAll() {
        try {
            const {rows} = await db.query('SELECT * FROM crypto;');
            if (rows) {
                return rows.map(row => new Crypto(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Crypto;