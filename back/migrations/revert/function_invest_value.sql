-- Revert mycryptofolio:function_invest_value from pg

BEGIN;

DROP FUNCTION wallet_value;
DROP FUNCTION wallet_invest;

COMMIT;
