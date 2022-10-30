-- Revert mycryptofolio:alter_functions from pg

BEGIN;

CREATE OR REPLACE FUNCTION update_transaction_bprice(json) RETURNS transaction AS $$
	UPDATE transaction SET
		price=($1->>'price')::decimal,
		fiat=($1->>'fiat'),
	    price_eur=($1->>'price_eur')::decimal,
		price_eth=($1->>'price_eth')::decimal,
		price_btc=($1->>'price_btc')::decimal
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE OR REPLACE VIEW view_transaction AS
SELECT
	transaction.id,
	buy_date,
	buy,
	transaction.price,
	quantity,
	crypto.coin_id,
	crypto.symbol,
	wallet.label AS "wallet_label",
	wallet_id,
	wallet.user_id,
	transaction.fiat as fiat,
	transaction.price * quantity as investment
FROM transaction
JOIN wallet
	ON wallet_id=wallet.id
JOIN crypto
	ON transaction.crypto_id=crypto.id;


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

CREATE or replace FUNCTION update_transaction(json) RETURNS transaction AS $$
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

COMMIT;
