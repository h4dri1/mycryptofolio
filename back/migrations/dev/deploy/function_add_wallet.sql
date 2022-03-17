-- Deploy mycryptofolio:function_add_wallet to pg

BEGIN;

CREATE OR REPLACE FUNCTION add_wallet(json) RETURNS wallet AS $$
	INSERT INTO wallet (label, user_id)
	VALUES (
		$1->>'label', 
		($1->>'user_id')::int
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_wallet(json) RETURNS wallet AS $$
	UPDATE wallet SET
		label=$1->>'label',
		user_id=($1->>'user_id')::int
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
