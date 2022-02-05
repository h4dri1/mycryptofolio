-- Deploy mycryptofolio:view_coin_value to pg

BEGIN;

CREATE OR REPLACE VIEW coins_value AS
SELECT
	user_id,
	symbol AS name,
	SUM (quantity) AS quantity,
	SUM (quantity * (SELECT price FROM crypto WHERE crypto.coin_id=view_transaction.coin_id)) AS value
FROM 
	view_transaction
WHERE 
	buy=true
GROUP BY 
user_id,
	symbol, 
	coin_id;

COMMIT;
