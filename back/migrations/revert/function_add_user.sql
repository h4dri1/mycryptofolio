-- Revert mycryptofolio:function_add_user from pg

BEGIN;

DROP FUNCTION add_user;
DROP FUNCTION update_user;

COMMIT;
