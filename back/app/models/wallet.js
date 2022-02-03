const db = require('../database');

class Wallet {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    };

    static async findWalletByUser(id) {
        try {
            const {rows} = await db.query('SELECT id, label, user_id FROM wallet WHERE user_id=$1;', [id]);
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
    };

    static async findWalletWithNoTransaction(id) {
        try {
            const {rows} = await db.query('SELECT * FROM wallet WHERE user_id=$1 AND id NOT IN (SELECT DISTINCT wallet_id FROM transaction);', [id]);
            if (rows) {
                return rows.map(row => new Wallet(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    static async delete(id) {
        try {
            await db.query('DELETE FROM wallet WHERE id=$1;', [id]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
}

module.exports = Wallet;