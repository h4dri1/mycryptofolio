class NoTransactionId extends Error {
    constructor(id) {
        super();
        this.message = `No transaction with id ${id}`;
        this.statusCode = 404;
    }
}

class NotYourTransaction extends Error {
    constructor(id) {
        super();
        this.message = `You doesn't own the transaction whith id ${id}`;
        this.statusCode = 403;
    }
}

class NoWallet extends Error {
    constructor() {
        super();
        this.message = `You have no wallet create one before add transaction`;
        this.statusCode = 409;
    }
}

class NotYourWallet extends Error {
    constructor(wid) {
        super();
        this.message = `You doesn't own the wallet with id ${wid}`;
        this.statusCode = 403;
    }
}

class NotPresentInWallet extends Error {
    constructor(coin) {
        super();
        this.message = `You are trying to sell ${coin} who are not present in this wallet`;
        this.statusCode = 409;
    }
}

class MoreCoinThanYouHave extends Error {
    constructor(body, wallet) {
        super();
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
        this.message = `Buy quantity must be a positive number`;
        this.statusCode = 400;
    }
}

class SellMustBeNegative extends Error {
    constructor() {
        super();
        this.message = `Sell quantity must be a negative number`;
        this.statusCode = 400;
    }
}

class PublicApiError extends Error {
    constructor(fetchData) {
        super();
        this.message = `Error with the request ${fetchData}`;
        this.statusCode = 500;
    }
}

class DeleteFirstSell extends Error {
    constructor(tid) {
        super();
        this.message = `Delete first sell transaction before delete the transaction whith id ${tid}`;
        this.statusCode = 409;
    }
}

class InvalidToken extends Error {
    constructor() {
        super();
        this.message = 'JWT Token invalid or not in the Header';
        this.statusCode = 498;
    }
}

class JWTError extends Error {
    constructor(mess) {
        super();
        this.message = mess;
        this.statusCode = 498;
    }
}

class BadPassUser extends Error {
    constructor() {
        super();
        this.message = `Bad password and/or user`;
        this.statusCode = 401;
    }
}

class EmailUsed extends Error {
    constructor(email) {
        super();
        this.message = `Email ${email} already used`;
        this.statusCode = 409;
    }
}

class CheckYourPassword extends Error {
    constructor () {
        super();
        this.message = `Please check your password`;
        this.statusCode = 400;
    }
}

class JoiError extends Error {
    constructor (mess) {
        super();
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
    JoiError,
    JWTError
};