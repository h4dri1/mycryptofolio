-- Deploy mycryptofolio:alter_view_wallet_user_transaction to pg

BEGIN;

DROP VIEW view_wallet_user_transaction CASCADE;
	
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
