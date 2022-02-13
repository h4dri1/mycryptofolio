-- Revert mycryptofolio:view_get_distribution_by_wallet from pg

BEGIN;

DROP VIEW view_get_distribution_by_wallet CASCADE;

COMMIT;
