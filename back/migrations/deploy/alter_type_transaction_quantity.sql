-- Deploy mycryptofolio:alter_type_transaction_quantity to pg

BEGIN;

DROP VIEW view_transaction CASCADE;

ALTER TABLE transaction
ALTER COLUMN quantity TYPE NUMERIC(8,8);

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

COMMIT;
