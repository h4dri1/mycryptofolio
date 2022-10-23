-- Deploy mycryptofolio:replace_view_coin_value2 to pg

BEGIN;

CREATE OR REPLACE VIEW coins_value AS
SELECT
	user_id,
	symbol AS name,
	SUM (quantity) AS quantity,
	SUM (investment) AS investment,
	SUM (quantity * (SELECT price FROM crypto WHERE crypto.coin_id=view_transaction.coin_id)) AS value,
	coin_id
FROM 
	view_transaction
GROUP BY
	user_id,
	symbol, 
	coin_id;
    
COMMIT;
