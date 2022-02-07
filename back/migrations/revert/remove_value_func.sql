-- Revert mycryptofolio:function_invest_value to pg

BEGIN;
	
CREATE FUNCTION wallet_value(IN x real, IN y int, OUT product DOUBLE PRECISION)
	AS 'SELECT x * y'
	LANGUAGE SQL;

COMMIT;