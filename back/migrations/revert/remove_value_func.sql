-- Revert mycryptofolio:function_invest_value to pg

BEGIN;

CREATE OR REPLACE FUNCTION wallet_invest(view_value) RETURNS numeric AS $$
	SELECT $1.buy_price * $1.total AS invest;
	$$ LANGUAGE SQL;
	
CREATE FUNCTION wallet_value(IN x real, IN y int, OUT product int)
	AS 'SELECT x * y'
	LANGUAGE SQL;

COMMIT;