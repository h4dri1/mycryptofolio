const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().alphanum().required(),
    vs: Joi.string().required(),
    include_market_cap: Joi.string().valid('true', 'false'),
    include_24hr_vol: Joi.string().valid('true', 'false'),
    include_24hr_change: Joi.string().valid('true', 'false'),
    include_last_updated_at: Joi.string().valid('true', 'false')
});

module.exports = schema;