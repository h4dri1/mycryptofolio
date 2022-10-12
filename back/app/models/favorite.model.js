const { pool } = require('../database');

class Favorite {

    constructor(obj={}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }

    static async getFavoriteByUserId(userId) {
        const { rows } = await pool.query(
            'SELECT \
                crypto.coin_id \
            FROM \
                favorite \
            JOIN crypto \
            ON favorite.crypto_id=crypto.id \
            WHERE \
                favorite.user_id = $1',
            [userId]);
        return rows.map(row => new Favorite(row));
    }

    static async addFavorite(userId, cryptoId) {
        try{
            const { rows } = await pool.query(
                'INSERT INTO favorite (user_id, crypto_id) VALUES ($1, (SELECT id as crypto_id FROM crypto WHERE coin_id=$2)) RETURNING *',
                [userId, cryptoId]);
            return rows.map(row => new Favorite(row));        
        } catch (err) {
            console.log(err);
        }

    }

    static async deleteFavorite(userId, cryptoId) {
        const { rows } = await pool.query(
            'DELETE FROM favorite WHERE user_id = $1 AND crypto_id = (SELECT id as crypto_id FROM crypto WHERE coin_id=$2)',
            [userId, cryptoId]);
        return rows.map(row => new Favorite(row));
    }
}

module.exports = Favorite;