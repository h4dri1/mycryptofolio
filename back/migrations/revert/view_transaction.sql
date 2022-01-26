-- Revert mycryptofolio:view_transaction from pg

BEGIN;

DROP VIEW view_transaction CASCADE;

COMMIT;
