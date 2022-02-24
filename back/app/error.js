class NoTransactionId extends Error {
    constructor(id) {
        super();
        this.name = this.constructor.name;
        this.message = `No transaction with id ${id}`;
        this.statusCode = 404;
    }
}

class NotYourTransaction extends Error {
    constructor(id) {
        super();
        this.name = this.constructor.name;
        this.message = `You doesn't own the transaction whith id ${id}`;
        this.statusCode = 403;
    }
}

class NoWallet extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `You have no wallet create one before add transaction`;
        this.statusCode = 409;
    }
}

class NotYourWallet extends Error {
    constructor(wid) {
        super();
        this.name = this.constructor.name;
        this.message = `You doesn't own the wallet with id ${wid}`;
        this.statusCode = 403;
    }
}

class NotPresentInWallet extends Error {
    constructor(coin) {
        super();
        this.name = this.constructor.name;
        this.message = `You are trying to sell ${coin} who are not present in this wallet`;
        this.statusCode = 409;
    }
}

class MoreCoinThanYouHave extends Error {
    constructor(body, wallet) {
        super();
        this.name = this.constructor.name;
        this.coin_id = body.coin_id;
        this.total_wallet = wallet.total;
        this.quantity_sell = body.quantity
        this.message = `You trying to sell more ${body.coin_id} than you have`;
        this.statusCode = 409;
    }
}

class BuyMustBePositive extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `Buy quantity must be a positive number`;
        this.statusCode = 400;
    }
}

class SellMustBeNegative extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `Sell quantity must be a negative number`;
        this.statusCode = 400;
    }
}

class PublicApiError extends Error {
    constructor(fetchData) {
        super();
        this.name = this.constructor.name;
        this.message = `Error with the request ${fetchData}`;
        this.statusCode = 500;
    }
}

class DeleteFirstSell extends Error {
    constructor(tid) {
        super();
        this.name = this.constructor.name;
        this.message = `Delete first sell transaction before delete the transaction whith id ${tid}`;
        this.statusCode = 409;
    }
}

class InvalidToken extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = 'JWT Token invalid or not in the Header';
        this.statusCode = 498;
    }
}

class JWTError extends Error {
    constructor(mess) {
        super();
        this.name = this.constructor.name;
        this.message = mess;
        this.statusCode = 498;
    }
}

class BadPassUser extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `Bad password and/or user`;
        this.statusCode = 401;
    }
}

class BanUser extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `You have try 5 times with bad credentials retry in 30min`;
        this.statusCode = 401;
    }
}

class UseRevokedRefreshToken extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `You try to use a revoked login session please to log in again`;
        this.statusCode = 403;
    }
}

class BadGuy extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;
        this.message = `The refresh token you trying to use is not yours, admin alerted`;
        this.statusCode = 403;
    }
}

class EmailUsed extends Error {
    constructor(email) {
        super();
        this.name = this.constructor.name;
        this.message = `Email ${email} already used`;
        this.statusCode = 409;
    }
}

class CheckYourPassword extends Error {
    constructor () {
        super();
        this.name = this.constructor.name;
        this.message = `Please check your password`;
        this.statusCode = 400;
    }
}

class FormError extends Error {
    constructor (mess) {
        super();
        this.name = this.constructor.name;
        this.message = mess;
        this.statusCode = 400;
    }
}

module.exports = {
    NoTransactionId,
    NoWallet,
    NotPresentInWallet,
    NotYourTransaction,
    NotYourWallet,
    SellMustBeNegative,
    BuyMustBePositive,
    MoreCoinThanYouHave,
    PublicApiError,
    DeleteFirstSell,
    InvalidToken,
    BadPassUser,
    EmailUsed,
    CheckYourPassword,
    FormError,
    JWTError,
    BanUser,
    UseRevokedRefreshToken,
    BadGuy
};