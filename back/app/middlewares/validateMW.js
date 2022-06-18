const { FormError } = require('../error')

const validator = {
    validateBody: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.body);
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
    }
}

module.exports = validator;