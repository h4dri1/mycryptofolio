-- Deploy mycryptofolio:remove_value_func to pg

BEGIN;
	
DROP FUNCTION wallet_value;

COMMIT;
