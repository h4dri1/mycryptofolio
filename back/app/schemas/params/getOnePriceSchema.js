const Joi = require('joi');

const schema = Joi.object({
    id: Joi.string().alphanum().required(),
    vs: Joi.string().required(),
    include_market_cap: Joi.boolean(),
    include_24hr_vol: Joi.boolean(),
    include_24hr_change: Joi.boolean(),
    include_last_updated_at: Joi.boolean()
});

module.exports = schema;