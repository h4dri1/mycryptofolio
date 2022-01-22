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

    static async doLogin(email) {
        try {
            const {rows} = await db.query('SELECT * FROM "user" WHERE email=$1', [email]);
            if (rows[0]) {
                return new User(rows[0]);
            }
        } catch (error) {
            console.log(error);
            throw error.name;
        };
    };
};

module.exports = User;