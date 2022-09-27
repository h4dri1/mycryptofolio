class BlockchainService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the blockchain service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

class CryptoService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the crypto service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

class NftsService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the nfts service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

class PortfolioService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the portfolio service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

class TransactionService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the transaction service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

class UserService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the user service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

class WalletService extends Error {
    constructor (err) {
        super();
        if (!err.level) {
            this.name = this.constructor.name;
            this.level = 'error';
            this.message = 'Error on the wallet service';
            this.statusCode = 500;
        } else {
            this.name = err.name;
            this.level = err.level;
            this.message = err.message;
            this.statusCode = err.statusCode;
        }
    }
}

module.exports = { BlockchainService, CryptoService, NftsService, PortfolioService, TransactionService, UserService, WalletService };