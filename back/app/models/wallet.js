const db = require('../database');

class Wallet {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async findWalletByUser(id) {
        try {
            const {rows} = await db.query('SELECT id, label FROM wallet WHERE user_id=$1 GROUP BY id, label;', [id]);
            if (rows) {
                return new Wallet(rows);
            }
        } catch (error) {
            console.log(error);
            throw error;
        };
    };
}

module.exports = Wallet;