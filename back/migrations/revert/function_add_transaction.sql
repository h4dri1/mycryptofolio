-- Revert mycryptofolio:function_add_transaction from pg

BEGIN;

DROP FUNCTION add_transaction;
DROP FUNCTION update_transaction;

COMMIT;
