-- Revert mycryptofolio:view_wallet_by_transaction from pg

BEGIN;

DROP VIEW view_wallet_by_transaction CASCADE;

COMMIT;
