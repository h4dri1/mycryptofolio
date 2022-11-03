const Joi = require('joi');
const { RateLimitError } = require('../error/error');

const pattern = /^0x[a-fA-F0-9]{40}$/;

const blockchainLimiter = {
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req) => {
    throw new RateLimitError(req.ip);
  },
};

const getHistoryTransactionToken = Joi.object({
  address: Joi.string()
    .regex(RegExp(pattern))
    .required(),
});

const getERC20Tokens = Joi.object({
  address: Joi.string()
    .regex(RegExp(pattern))
    .required(),
  vs: Joi.string().min(3).max(5).required(),
  net: Joi.string().optional(),
  network: Joi.string().optional(),
});

const getNFTbyAddress = Joi.object({
  address: Joi.string()
    .regex(RegExp(pattern))
    .required(),
  network: Joi.string().required(),
});

const getENSbyAddress = Joi.object({
  address: Joi.string()
    .regex(RegExp(pattern))
    .required(),
});

module.exports = {
  getHistoryTransactionToken, getERC20Tokens, getNFTbyAddress, getENSbyAddress, blockchainLimiter,
};
