-- Revert mycryptofolio:view_coin_value from pg

BEGIN;

DROP VIEW coins_value;
DROP VIEW coins_value_wallet;

COMMIT;
