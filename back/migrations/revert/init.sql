-- Revert mycryptofolio:init from pg

BEGIN;

DROP TABLE "transaction", "user", "wallet", "crypto" CASCADE;

COMMIT;
