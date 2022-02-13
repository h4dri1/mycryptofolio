-- Deploy mycryptofolio:remove_view_get_distribution to pg

BEGIN;

DROP VIEW view_get_distribution_by_wallet;

COMMIT;
