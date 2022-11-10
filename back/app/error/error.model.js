/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */
class BlockchainModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to wallet data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Blockchain.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class CryptoModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to crypto data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Crypto.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class FavoriteModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to favorite data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Favorite.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class NetworkModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to wallet network, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Network.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class PortfolioModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to portfolio data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Portfolio.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class TransactionModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to transaction data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Transaction.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class UserModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to user data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `User.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class WalletModel extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when access to wallet data, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Wallet.model: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

module.exports = {
  BlockchainModel, CryptoModel, FavoriteModel, NetworkModel, PortfolioModel, TransactionModel, UserModel, WalletModel,
};
