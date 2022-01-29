-- Deploy mycryptofolio:function_add_user to pg

BEGIN;

CREATE OR REPLACE FUNCTION add_user(json) RETURNS "user" AS $$
	INSERT INTO "user" (email, nickname, password, picture)
	VALUES (
		$1->>'email', 
		$1->>'nickname',
        $1->>'password',
        $1->>'picture'
	)
	RETURNING *;
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_user(json) RETURNS "user" AS $$
	UPDATE "user" SET
		email=$1->>'email',
		nickname=$1->>'nickname',
        password=$1->>'password',
        picture=$1->>'picture'
	WHERE id=($1->>'id')::int
	RETURNING *;
$$ LANGUAGE SQL STRICT;

COMMIT;
