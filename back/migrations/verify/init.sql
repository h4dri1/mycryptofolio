-- Verify mycryptofolio:init on pg

BEGIN;

SELECT * FROM user WHERE false;
SELECT * FROM transaction WHERE false;
SELECT * FROM wallet WHERE false;
SELECT * FROM crypto WHERE false;

ROLLBACK;
