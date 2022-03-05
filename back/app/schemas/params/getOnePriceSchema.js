const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().alphanum().required(),
    vs: Joi.string().required(),
    include_market_cap: Joi.string(),
    include_24hr_vol: Joi.string(),
    include_24hr_change: Joi.string(),
    include_last_updated_at: Joi.string()
});

module.exports = schema;