-- Revert mycryptofolio:views from pg

BEGIN;

DROP VIEW view_transaction CASCADE;
DROP VIEW view_wallet_user_transaction;

COMMIT;
