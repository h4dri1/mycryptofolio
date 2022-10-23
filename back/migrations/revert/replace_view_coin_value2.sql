-- Revert mycryptofolio:replace_view_coin_value2 from pg

BEGIN;

DROP VIEW IF EXISTS coins_value;  

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

COMMIT;