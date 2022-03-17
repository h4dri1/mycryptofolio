-- Revert mycryptofolio:function_add_price from pg

BEGIN;

DROP FUNCTION update_price;

COMMIT;
