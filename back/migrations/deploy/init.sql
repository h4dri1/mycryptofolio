-- Deploy mycryptofolio:init to pg

BEGIN;

DROP TABLE IF EXISTS "transaction", "user", "wallet", "crypto" CASCADE;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    picture TEXT,
    currency TEXT NOT NULL DEFAULT 'USD',
    verify BOOLEAN NOT NULL DEFAULT FALSE
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
    logo TEXT,
    price numeric(16,8)
);

CREATE TABLE transaction (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    buy_date TIMESTAMPTZ NOT NULL,
    buy BOOLEAN NOT NULL,
    price DECIMAL NOT NULL,
    quantity NUMERIC(16,8) NOT NULL,
    actual_value DOUBLE PRECISION,
    wallet_id INT REFERENCES wallet(id),
    crypto_id INT REFERENCES crypto(id),
    fiat TEXT NOT NULL
);

COMMIT;
