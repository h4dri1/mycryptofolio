const Joi = require('joi');

const schema = Joi.object({
    tid: Joi.number().required()
});

module.exports = schema;