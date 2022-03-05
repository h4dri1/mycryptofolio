const Joi = require('joi');

const schema = Joi.object({
    wid: Joi.number().required()
});

module.exports = schema;