-- Deploy mycryptofolio:view_get_distribution_by_wallet to pg

BEGIN;

CREATE OR REPLACE VIEW view_get_distribution_by_wallet AS
SELECT
	user_id,
	wallet_id,
	name, 
	quantity, 
	investment,  
	value,
	(100 * coins_value_wallet.value) /
	(CASE
	WHEN quantity = 0 THEN
		1
	END) AS distribution 
FROM 
	coins_value_wallet
GROUP BY
	user_id,
	wallet_id,
	investment, 
	name, quantity, 
	value;

COMMIT;
