-- Deploy mycryptofolio:add_favorite to pg

BEGIN;

CREATE TABLE favorite (
	"user_id" INT NOT NULL REFERENCES "user"("id"),
	"crypto_id" INT NOT NULL REFERENCES "crypto"("id"),
	PRIMARY KEY("user_id", "crypto_id")
);

COMMIT;
