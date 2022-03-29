-- Deploy mycryptofolio:view_transaction to pg

BEGIN;

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

COMMIT;
