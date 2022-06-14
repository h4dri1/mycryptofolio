const { pool } = require('../database');

class User {
    constructor(obj={}) {
        for (const propname in obj) {
            this[propname] = obj[propname];
        }
    }

    static async findOne(email) {
        const {rows} = await pool.query('SELECT * FROM "user" WHERE email=$1;', [email]);
        return new User(rows[0]);
    }

    static async findById(id) {
        const {rows} = await pool.query('SELECT * FROM "user" WHERE id=$1;', [id]);
        return new User(rows[0]);
    }

    static async updatePass(password, id) {
        const {rows} = await pool.query('UPDATE "user" set password=$1 WHERE id=$2;', [password, id]);
        return new User(rows[0]);
    }

    static async updateAvatar(picture, id) {
        const {rows} = await pool.query('UPDATE "user" set picture=$1 WHERE id=$2 RETURNING *;', [picture, id]);
        return new User(rows[0]);
    }

    async save() {
        if(this.id) {
            await pool.query('SELECT * FROM update_user($1)', [this])
        } else {
            const {rows} = await pool.query('SELECT * FROM add_user($1);', [this]);
            if (rows) {
                this.id = rows[0].id;
                return this;
            }
        }
        return this;
    }
};

module.exports = User;