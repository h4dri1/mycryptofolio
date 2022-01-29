const db = require('../database');

class Wallet {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    static async findWalletByUser(id) {
        try {
            const {rows} = await db.query('SELECT id, label FROM wallet WHERE user_id=$1 GROUP BY id, label;', [id]);
            if (rows) {
                return rows.map(row => new Wallet(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        };
    };

    async save() {
        try {
            console.log(this)
            if(this.id) {
                await db.query('SELECT * FROM update_wallet($1)', [this])
            } else {
                const {rows} = await db.query('SELECT * FROM add_wallet($1)', [this]);
                if (rows) {
                    this.id = rows[0].id;
                    return this;
                }
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Wallet;