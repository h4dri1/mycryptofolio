-- Deploy mycryptofolio:function_add_transaction to pg

BEGIN;

CREATE OR REPLACE FUNCTION add_transaction(json) RETURNS transaction AS $$
	INSERT INTO transaction (buy_date, buy, price, quantity, wallet_id, crypto_id)
	VALUES (
		($1->>'buy_date')::timestamp, 
		($1->>'buy')::boolean, 
		($1->>'price')::decimal, 
		($1->>'quantity')::numeric, 
		($1->>'wallet_id')::int,
		($1->>'crypto_id')::int
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_transaction(json) RETURNS transaction AS $$
	UPDATE transaction SET
		buy_date=($1->>'buy_date')::timestamp,
		buy=($1->>'buy')::boolean,
		price=($1->>'price')::decimal,
		quantity=($1->>'quantity')::numeric,
		wallet_id=($1->>'wallet_id')::int,
		crypto_id=($1->>'crypto_id')::int
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
