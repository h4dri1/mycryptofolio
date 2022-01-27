const validator = {
    validateBody: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) {
            res.status(400).json(error.message);
        } else {
            next();
        }
    },

    validateQuery: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.query);
        if (error) {
            res.status(400).json(error.message);
        } else {
            next();
        }
    },

    validateParams: (schema) => (req, res, next) => {
        const {error} = schema.validate(req.params);
        if (error) {
            res.status(400).json(error.message);
        } else {
            next();
        }
    },

    validateJWT: (req, res, next) => {
        try {
            if (!req.params.token) {
                return res.status(401).json('Token Invalide !');
            }
            next();
        } catch (error) {
            console.log(error);
            return res.status(401).json(error.message);
        };
    }
}

module.exports = validator;