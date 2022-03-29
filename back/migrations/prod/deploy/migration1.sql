-- Deploy mycryptofolio:migration1 to pg

BEGIN;

CREATE OR REPLACE FUNCTION update_transaction_bprice(json) RETURNS transaction AS $$
	UPDATE transaction SET
		price=($1->>'price')::decimal,
		fiat=($1->>'fiat')
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

ALTER TABLE transaction 
ADD COLUMN fiat TEXT;

UPDATE transaction SET fiat='usd';

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
	transaction.fiat as fiat
FROM transaction
JOIN wallet
	ON wallet_id=wallet.id
JOIN crypto
	ON transaction.crypto_id=crypto.id;
COMMIT;
