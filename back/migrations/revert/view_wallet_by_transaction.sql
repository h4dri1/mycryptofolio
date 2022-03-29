-- Revert mycryptofolio:view_wallet_by_transaction from pg

BEGIN;

DROP VIEW view_wallet_user_transaction CASCADE;

COMMIT;
