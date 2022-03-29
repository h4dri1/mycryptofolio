-- Revert mycryptofolio:remove_view_get_distribution from pg

BEGIN;

CREATE OR REPLACE VIEW view_get_distribution_by_wallet AS
SELECT 
	name, 
	quantity, 
	investment,  
	value,
	(100 * coins_value_wallet.value) / (SELECT SUM(value) FROM coins_value_wallet WHERE coins_value_wallet.quantity!=0) AS distribution
FROM 
	coins_value_wallet
WHERE
	quantity!=0
GROUP BY 
	investment, 
	name, quantity, 
	value;

COMMIT;
