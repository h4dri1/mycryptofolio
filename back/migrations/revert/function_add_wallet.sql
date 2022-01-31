-- Revert mycryptofolio:function_add_wallet from pg

BEGIN;

DROP FUNCTION add_wallet;
DROP FUNCTION update_wallet;

COMMIT;
