-- Revert mycryptofolio:add_column_transaction from pg

BEGIN;

ALTER TABLE transaction DROP COLUMN "price_eur";
ALTER TABLE transaction DROP COLUMN "price_eth";
ALTER TABLE transaction DROP COLUMN "price_btc";
ALTER TABLE transaction DROP COLUMN "price_usd";

COMMIT;
