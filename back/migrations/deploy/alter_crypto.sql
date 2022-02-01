-- Deploy mycryptofolio:alter_crypto to pg

BEGIN;

ALTER TABLE crypto 
ADD COLUMN price int;

COMMIT;
