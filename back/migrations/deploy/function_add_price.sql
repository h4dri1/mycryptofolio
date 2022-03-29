-- Deploy mycryptofolio:function_add_price to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_price(json) RETURNS crypto AS $$
	UPDATE crypto SET
		price=($1->>'price')::decimal
	WHERE coin_id=$1->>'coin_id'
	RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
