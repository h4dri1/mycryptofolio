-- Deploy mycryptofolio:production to pg

BEGIN;

DROP TABLE IF EXISTS "transaction", "user", "wallet", "crypto" CASCADE;

CREATE TABLE "user" (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    nickname TEXT NOT NULL,
    password TEXT NOT NULL,
    picture TEXT
);

CREATE TABLE wallet(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    label TEXT NOT NULL,
    user_id INT REFERENCES "user"(id)
);

CREATE TABLE crypto (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    coin_id TEXT NOT NULL UNIQUE,
    symbol TEXT NOT NULL,
    logo TEXT,
    price numeric(16,8)
);

CREATE TABLE transaction (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    buy_date TIMESTAMPTZ NOT NULL,
    buy BOOLEAN NOT NULL,
    price DECIMAL NOT NULL,
    quantity NUMERIC(16,8),
    actual_value DOUBLE PRECISION,
    wallet_id INT REFERENCES wallet(id),
    crypto_id INT REFERENCES crypto(id)
);

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

CREATE FUNCTION update_user(json) RETURNS "user" AS $$
	UPDATE "user" SET
		email=$1->>'email',
		nickname=$1->>'nickname',
        password=$1->>'password',
        picture=$1->>'picture'
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

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

CREATE OR REPLACE FUNCTION update_price(json) RETURNS crypto AS $$
	UPDATE crypto SET
		price=($1->>'price')::decimal
	WHERE coin_id=$1->>'coin_id'
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
	wallet.user_id
FROM transaction
JOIN wallet
	ON wallet_id=wallet.id
JOIN crypto
	ON transaction.crypto_id=crypto.id;

CREATE OR REPLACE VIEW coins_value AS
SELECT
	user_id,
	symbol AS name,
	SUM (quantity) AS quantity,
	AVG(view_transaction.price) * SUM (quantity) AS investment,
	SUM (quantity * (SELECT price FROM crypto WHERE crypto.coin_id=view_transaction.coin_id)) AS value
FROM 
	view_transaction
GROUP BY
	user_id,
	symbol, 
	coin_id;

CREATE OR REPLACE VIEW coins_value_wallet AS
SELECT
	wallet_id,
	wallet_label,
	user_id,
	symbol AS name,
	SUM (quantity) AS quantity,
	AVG(view_transaction.price) * SUM (quantity) AS investment,
	SUM (quantity * (SELECT price FROM crypto WHERE crypto.coin_id=view_transaction.coin_id)) AS value
FROM 
	view_transaction
GROUP BY
	wallet_label,
	wallet_id,
	user_id,
	symbol, 
	coin_id;

CREATE OR REPLACE VIEW view_wallet_user_transaction AS
SELECT
	transaction.id as transaction_id,
	wallet_id,
	wallet.user_id,
	(SELECT coin_id FROM crypto WHERE id=transaction.crypto_id) as coin_id,
	buy
FROM 
	transaction
JOIN wallet
ON
	wallet_id=wallet.id;

COMMIT;
