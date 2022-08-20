-- Deploy mycryptofolio:init to pg

BEGIN;

DROP TABLE IF EXISTS "transaction", "user", "wallet", "crypto", "nft", "network" CASCADE;

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
    eth TEXT UNIQUE,
    matic TEXT UNIQUE,
    bnb TEXT UNIQUE,
    avax TEXT UNIQUE,
    ftm TEXT UNIQUE,
    logo TEXT,
    price numeric(16,8)
);

CREATE TABLE nft (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rank INT NOT NULL,
    icon_url TEXT NOT NULL,
    name TEXT NOT NULL,
    base_currency TEXT NOT NULL
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

CREATE TABLE network (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    coingecko_name TEXT,
    moralis_name TEXT,
    symbol TEXT NOT NULL,
    hex TEXT NOT NULL,
    chainId INT NOT NULL,
    network TEXT NOT NULL,
    platform TEXT
);

COMMIT;
