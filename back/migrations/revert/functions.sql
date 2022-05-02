-- Revert mycryptofolio:functions from pg

BEGIN;

DROP FUNCTION update_price;
DROP FUNCTION add_transaction;
DROP FUNCTION update_transaction;
DROP FUNCTION add_user;
DROP FUNCTION update_user;
DROP FUNCTION add_wallet;
DROP FUNCTION update_wallet;
DROP FUNCTION update_transaction_bprice;

COMMIT;
