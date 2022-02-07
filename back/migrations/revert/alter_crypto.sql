-- Revert mycryptofolio:alter_crypto from pg

BEGIN;

ALTER TABLE crypto 
DROP COLUMN price CASCADE;

COMMIT;
