-- Deploy mycryptofolio:functions to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_price(json) RETURNS crypto AS $$
	UPDATE crypto SET
		price=($1->>'price')::decimal
	WHERE coin_id=$1->>'coin_id'
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION add_transaction(json) RETURNS transaction AS $$
	INSERT INTO transaction (buy_date, buy, price, quantity, wallet_id, crypto_id, fiat)
	VALUES (
		($1->>'buy_date')::timestamp, 
		($1->>'buy')::boolean, 
		($1->>'price')::decimal, 
		($1->>'quantity')::numeric, 
		($1->>'wallet_id')::int,
		($1->>'crypto_id')::int,
		($1->>'fiat')
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
		crypto_id=($1->>'crypto_id')::int,
		fiat=($1->>'fiat')
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION add_user(json) RETURNS "user" AS $$
	INSERT INTO "user" (email, nickname, password, picture)
	VALUES (
		$1->>'email', 
		$1->>'nickname',
        $1->>'password',
        $1->>'picture'
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION update_user(json) RETURNS "user" AS $$
	UPDATE "user" SET
		email=$1->>'email',
		nickname=$1->>'nickname',
		picture=$1->>'picture'
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION add_wallet(json) RETURNS wallet AS $$
	INSERT INTO wallet (label, user_id)
	VALUES (
		$1->>'label', 
		($1->>'user_id')::int
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_wallet(json) RETURNS wallet AS $$
	UPDATE wallet SET
		label=$1->>'label',
		user_id=($1->>'user_id')::int
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE FUNCTION update_transaction_bprice(json) RETURNS transaction AS $$
	UPDATE transaction SET
		price=($1->>'price')::decimal,
		fiat=($1->>'fiat')
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
