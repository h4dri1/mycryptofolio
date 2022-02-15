const db = require('../database');

class Transaction {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async getPerformance(id) {
        try {
            const {rows} = await db.query('SELECT SUM (investment) as investment, SUM (value) as actual_value,\
            SUM (value) - SUM (investment) as pnl FROM coins_value WHERE user_id=$1;', [id]);
            if (rows) {
                return new Transaction(rows[0]);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getPerformanceByWallet(id, wid) {
        try {
            const {rows} = await db.query('SELECT SUM (investment) as investment, SUM (value) as actual_value, \
            SUM (value) - SUM (investment) as pnl FROM coins_value_wallet WHERE user_id=$1 AND wallet_id=$2;', [id, wid]);
            if (rows) {
                return new Transaction(rows[0]);
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getDistribution(id) {
        try {
            const {rows} = await db.query('SELECT name, quantity, value, (100 * coins_value.value) /\
            (SELECT SUM(value) FROM coins_value WHERE user_id=$1 AND coins_value.quantity!=0) as distribution \
            FROM coins_value WHERE quantity!=0 AND coins_value.user_id=$1\
            GROUP BY name, quantity, value;', [id]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async getDistributionByWallet(id, wid) {
        try {
            const {rows} = await db.query('SELECT name, quantity,  value, (100 * coins_value_wallet.value) / \
            (SELECT SUM(value) FROM coins_value_wallet WHERE user_id=$1 AND wallet_id=$2 AND coins_value_wallet.quantity!=0) AS distribution \
            FROM coins_value_wallet WHERE quantity!=0 AND user_id=$1 AND wallet_id=$2 GROUP BY name, quantity, value;', [id, wid]);
            if (rows) {
                return rows.map(row => new Transaction(row));
            }
        } catch (error) {
            console.log(error);
            throw error;
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
            const {rows} = await db.query('SELECT * FROM view_wallet_user_transaction WHERE wallet_id=$1;', [wid]);
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
            const {rows} = await db.query('SELECT wallet_id, wallet_label, coin_id, symbol, AVG(price) as buy_price,\
            SUM (quantity) AS total, (AVG(price) * SUM(quantity)) AS investment\
            FROM view_transaction WHERE user_id=$1 GROUP BY symbol, wallet_id, wallet_label, coin_id;', [user_id]);
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
            const {rows} = await db.query('SELECT wallet_id, wallet_label, coin_id, symbol, AVG(price) as buy_price, SUM(quantity) AS total,\
            (AVG(price) * SUM(quantity)) AS investment\
            FROM view_transaction WHERE user_id=$1 AND wallet_id=$2 GROUP BY wallet_id, wallet_label, symbol, coin_id;', [user_id, wallet_id]);
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

    static async getSumCoinByWalletWithSell(tid) {
        try {
            const {rows} = await db.query('SELECT transaction_id, wallet_id, user_id, coin_id, buy,\
            (SELECT quantity FROM view_transaction WHERE id=$1), \
            (SELECT COUNT (buy = false) FROM view_wallet_user_transaction WHERE buy=false AND \
                 (SELECT coin_id FROM view_wallet_user_transaction WHERE transaction_id=$1)=coin_id) AS sell, \
            (SELECT SUM(quantity) FROM view_transaction WHERE \
                (SELECT coin_id FROM view_wallet_user_transaction WHERE transaction_id=$1)=coin_id AND wallet_id= \
                     (SELECT wallet_id FROM view_wallet_user_transaction WHERE transaction_id=$1)) AS total\
            FROM view_wallet_user_transaction WHERE transaction_id=$1 GROUP BY buy, transaction_id, wallet_id, user_id, coin_id;', [tid]);
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