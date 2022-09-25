const blockchainService = require('./blockchain.service');
const cryptoService = require('./crypto.service');
const userService = require('./user.service');
const {cache, flush } = require('./cache');
const fetch = require('./fetch');
const guards = require('./guards');
const jwt = require('./jwt');
const update = require('./update');
const mailer = require('./mailer');

module.exports = {
    cache,
    flush,
    fetch,
    guards,
    jwt,
    update,
    mailer,
    blockchainService,
    cryptoService,
    userService
}