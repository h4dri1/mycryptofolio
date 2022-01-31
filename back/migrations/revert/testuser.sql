-- Revert mycryptofolio:testuser from pg

BEGIN;

ALTER TABLE "user"
    DROP COLUMN email,
    DROP COLUMN nickname CASCADE,
    DROP COLUMN password CASCADE,
    DROP COLUMN picture CASCADE;

COMMIT;
