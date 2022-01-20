-- Deploy mycryptofolio:testuser to pg

BEGIN;

INSERT INTO "user" (email, nickname, password, picture) VALUES
('test@test.fr', 'test', '$2a$10$x4Xt/4SE6IpashO03u5bS.ovOG2SFMaVaEGgZeKF90pSveR3qOuzu', 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot03_90833.png');

COMMIT;
