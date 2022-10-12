-- Revert mycryptofolio:add_favorite from pg

BEGIN;

DROP TABLE favorite;

COMMIT;
