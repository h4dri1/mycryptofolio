const { FormError, InvalidToken } = require('../services/error')

const validator = {
    validateBody: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
            throw new FormError(error.message)
        } else {
            next();
        }
    },

    validateQuery: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.query);
        if (error) {
            throw new FormError(error.message)
        } else {
            next();
        }
    },

    validateParams: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.params);
        if (error) {
            throw new FormError(error.message)
        } else {
            next();
        }
    },

    validateJWT: (req, res, next) => {
        try {
            if (!req.params.token) {
                throw new InvalidToken()
            }
            next();
        } catch (err) {
            next(err)
        };
    }
}

module.exports = validator;