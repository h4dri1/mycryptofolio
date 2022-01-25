-- Deploy mycryptofolio:function_invest_value to pg

BEGIN;

CREATE FUNCTION wallet_invest(view_transaction) RETURNS double precision AS $$
	SELECT $1.price * $1.quantity AS invest;
	$$ LANGUAGE SQL;
	
CREATE FUNCTION wallet_value(IN x real, IN y int, OUT product double precision)
	AS 'SELECT x * y'
	LANGUAGE SQL;

COMMIT;
