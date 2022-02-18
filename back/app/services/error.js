class NoTransactionId extends Error {
    constructor(id) {
        super(`No transaction with id ${id}`);
    }
}

class NotYourTransaction extends Error {
    constructor(id) {
        super(`You doesn\'t own the transaction whith id ${id}`);
    }
}

class NoWallet extends Error {
    constructor() {
        super(`You have no wallet create one before add transaction`);
    }
}

class NotYourWallet extends Error {
    constructor(wid) {
        super(`You doesn't own the wallet with id ${wid}`);
    }
}

class NotPresentInWallet extends Error {
    constructor(coin) {
        super(`You are trying to sell ${coin} who are not present in this wallet`);
    }
}

class MoreCoinThanYouHave extends Error {
    constructor() {
        super(`You trying to sell more coin than you have`);
    }
}

class BuyMustBePositive extends Error {
    constructor() {

        super(`Buy quantity must be a positive number`);
    }
}

class SellMustBeNegative extends Error {
    constructor() {
        super(`Sell quantity must be a negative number`);
    }
}

class PublicApiError extends Error {
    constructor() {
        super(`Error with the request to the public API`);
    }
}

class DeleteFirstSell extends Error {
    constructor(tid) {
        super(`Delete first sell transaction before delete the transaction whith id ${tid}`)
    }
}

class InvalidToken extends Error {
    constructor() {
        super('JWT Token invalid or not in the Header')
    }
}

class BadPassUser extends Error {
    constructor() {
        super(`Bad password and/or user`)
    }
}

class EmailUsed extends Error {
    constructor(email) {
        super(`Email ${email} already used`)
    }
}

class CheckYourPassword extends Error {
    constructor () {
        super(`Please check your password`)
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
    CheckYourPassword
};