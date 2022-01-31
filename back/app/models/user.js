const db = require('../database');

class User {
    constructor(obj={}) {
        for (const propname in obj) {
            this[propname] = obj[propname];
        }
    }

    /**
     * @static
     * @async
     * @param {string} email
     * @throws {Error}
     */

     static async findOne(email) {
        try {
            const {rows} = await db.query('SELECT * FROM "user" WHERE email=$1;', [email]);
            if (rows[0]) {
                return new User(rows[0]);
            }
        } catch (error) {
            console.log(error);
            throw error; 
        }
    }

    async save() {
        try {
            if(this.id) {
                await db.query('SELECT * FROM update_user($1)', [this])
            } else {
                const {rows} = await db.query('SELECT * FROM add_user($1)', [this]);
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
};

module.exports = User;