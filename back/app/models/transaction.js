const db = require('../database');

class Transaction {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
    static async getTransactionByPk(tid) {
        try {
            const {rows} = await db.query('SELECT * FROM transaction WHERE id=$1;', [tid]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getTransactionByWallet(wid) {
        try {
            const {rows} = await db.query('SELECT transaction_id FROM view_wallet_user_transaction WHERE wallet_id=$1;', [wid]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getWalletIdByTransaction(tid) {
        try {
            const {rows} = await db.query('SELECT * FROM view_wallet_user_transaction WHERE transaction_id=$1;', [tid]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getUserCrypto(user_id) {
        try {
            const {rows} = await db.query('SELECT wallet_id, wallet_label, coin_id, symbol, AVG(price) as buy_price, SUM (quantity) AS total \
            FROM view_transaction WHERE user_id=$1 AND buy=true GROUP BY symbol, wallet_id, wallet_label, coin_id;', [user_id]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getUserCryptoByWallet(user_id, wallet_id) {
        try {
            const {rows} = await db.query('SELECT wallet_id, wallet_label, coin_id, symbol, AVG(price) as buy_price, SUM(quantity) AS total \
            FROM view_transaction WHERE user_id=$1 AND wallet_id=$2 AND buy=true GROUP BY wallet_id, wallet_label, symbol, coin_id;', [user_id, wallet_id]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getUserTransaction(user_id) {
        try {
            const {rows} = await db.query('SELECT id, symbol, buy, price, quantity, buy_date \
            FROM view_transaction WHERE user_id=$1 ORDER BY buy_date DESC;', [user_id]);
            if (rows) {
                return new Transaction(rows);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getUserTransactionByWallet(user_id, wallet_id) {
        try {
            const {rows} = await db.query('SELECT id, symbol, buy, price, quantity, buy_date \
            FROM view_transaction WHERE user_id=$1 AND wallet_id=$2 ORDER BY buy_date DESC;', [user_id, wallet_id]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async save() {
        try {
            if(this.id) {
                await db.query('SELECT * FROM update_transaction($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT * FROM add_transaction($1)', [this]);
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

    static async delete(id) {
        try {
            await db.query('DELETE FROM transaction WHERE id=$1;', [id]);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = Transaction;