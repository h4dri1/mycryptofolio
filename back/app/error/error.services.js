/* eslint-disable max-classes-per-file */
class BlockchainService extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to wallet info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Blockchain.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class CryptoService extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to crypto info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Crypto.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class NftsService extends Error {
  constructor(err) {
    super();
    if (!err.level) {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to nfts info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Nfts.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class PortfolioService extends Error {
  constructor(err) {
    super();
    if (!err.level) {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to portfolio info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Portfolio.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class TransactionService extends Error {
  constructor(err) {
    super();
    if (!err.level) {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when process transaction info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Transaction.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class UserService extends Error {
  constructor(err) {
    super();
    if (!err.level) {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to user info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `User.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class WalletService extends Error {
  constructor(err) {
    super();
    if (!err.level) {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to wallet info, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Wallet.service: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

module.exports = {
  BlockchainService,
  CryptoService,
  NftsService,
  PortfolioService,
  TransactionService,
  UserService,
  WalletService,
};
