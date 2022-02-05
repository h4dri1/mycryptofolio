-- Deploy mycryptofolio:function_invest_value to pg

BEGIN;
	
CREATE FUNCTION wallet_value(IN x real, IN y int, OUT product int)
	AS 'SELECT x * y'
	LANGUAGE SQL;

COMMIT;
