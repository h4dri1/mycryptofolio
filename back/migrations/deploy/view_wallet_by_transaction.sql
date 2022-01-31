-- Deploy mycryptofolio:view_wallet_by_transaction to pg

BEGIN;

CREATE VIEW view_wallet_user_transaction AS
SELECT
	transaction.id as transaction_id,
	wallet_id,
	wallet.user_id
FROM 
	transaction
JOIN wallet
ON
	wallet_id=wallet.id;

COMMIT;
