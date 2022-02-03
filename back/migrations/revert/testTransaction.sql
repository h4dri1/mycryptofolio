-- Revert mycryptofolio:testTransaction from pg

BEGIN;

ALTER TABLE wallet
    DROP COLUMN label,
    DROP COLUMN user_id CASCADE;

ALTER TABLE transaction
    DROP COLUMN buy_date CASCADE,
    DROP COLUMN buy,
    DROP COLUMN price,
    DROP COLUMN quantity,
    DROP COLUMN wallet_id CASCADE,
    DROP COLUMN crypto_id CASCADE;

COMMIT;
