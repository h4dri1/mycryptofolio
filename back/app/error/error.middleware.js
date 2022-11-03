/* eslint-disable max-classes-per-file */
class AuthMiddleware extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error on the auth middleware';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = err.message;
      this.statusCode = err.statusCode;
    }
  }
}

class CacheMiddleware extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error on the cache middleware';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = err.message;
      this.statusCode = err.statusCode;
    }
  }
}

class GuardMiddleware extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error on the guard middleware';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = err.message;
      this.statusCode = err.statusCode;
    }
  }
}

class UpdateMiddleware extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error on the update middleware';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = err.message;
      this.statusCode = err.statusCode;
    }
  }
}

module.exports = {
  AuthMiddleware, CacheMiddleware, GuardMiddleware, UpdateMiddleware,
};
