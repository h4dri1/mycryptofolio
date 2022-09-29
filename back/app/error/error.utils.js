class AuthUtils extends Error {
    constructor (err) {
        super();
        if (!err.level && process.env.NODE_ENV !== 'dev') {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the auth utils';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

module.exports = { AuthUtils };