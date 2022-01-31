-- Revert mycryptofolio:function_invest_value from pg

BEGIN;

DROP FUNCTION wallet_invest CASCADE;
DROP FUNCTION wallet_value;

COMMIT;
