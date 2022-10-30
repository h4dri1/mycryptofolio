-- Deploy mycryptofolio:add_column_transaction to pg

BEGIN;

ALTER TABLE transaction add COLUMN "price_eur" decimal;
ALTER TABLE transaction add COLUMN "price_eth" decimal;
ALTER TABLE transaction add COLUMN "price_btc" decimal;
ALTER TABLE transaction add COLUMN "price_usd" decimal;

COMMIT;
