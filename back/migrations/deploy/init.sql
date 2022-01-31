-- Deploy mycryptofolio:init to pg

BEGIN;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    picture TEXT
);

CREATE TABLE wallet(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE crypto (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    coin_id TEXT NOT NULL UNIQUE,
    symbol TEXT NOT NULL,
    logo TEXT
);

CREATE TABLE transaction (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    buy_date TIMESTAMPTZ NOT NULL,
    buy BOOLEAN NOT NULL,
    price DOUBLE PRECISION NOT NULL,
    quantity REAL NOT NULL,
    actual_value DOUBLE PRECISION,
    wallet_id INT REFERENCES wallet(id),
    crypto_id INT REFERENCES crypto(id)
);

COMMIT;
