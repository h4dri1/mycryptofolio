// eslint-disable-next-line max-classes-per-file
class AuthUtils extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error on authentification, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Auth.utils: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class MailerUtils extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when sending email, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Mailer.utils: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class UpdateUtils extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when updating price, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Update.utils: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

class GuardError extends Error {
  constructor(err) {
    super();
    if (!err.level && process.env.NODE_ENV !== 'dev') {
      this.name = this.constructor.name;
      this.level = 'error';
      this.message = 'Error when verifying modification, please try again';
      this.statusCode = 500;
    } else {
      this.name = err.name;
      this.level = err.level;
      this.message = `Guard.utils: ${err.message}`;
      this.statusCode = err.statusCode;
    }
  }
}

module.exports = { AuthUtils, MailerUtils, UpdateUtils, GuardError };
