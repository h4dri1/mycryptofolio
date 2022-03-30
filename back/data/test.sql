BEGIN;

TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;
TRUNCATE TABLE transaction RESTART IDENTITY CASCADE;
TRUNCATE TABLE wallet RESTART IDENTITY CASCADE;

INSERT INTO "user" (email, nickname, password, picture) VALUES
('test@test.fr', 'test', '$2a$10$x4Xt/4SE6IpashO03u5bS.ovOG2SFMaVaEGgZeKF90pSveR3qOuzu', 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot03_90833.png'),
('test2@test.fr', 'test2', '$2a$10$x4Xt/4SE6IpashO03u5bS.ovOG2SFMaVaEGgZeKF90pSveR3qOuzu', 'https://cdn.icon-icons.com/icons2/1371/PNG/512/robot03_90833.png');

INSERT INTO wallet (label, user_id) VALUES
('Day Trading', '1'),
('Long', '1'),
('Day Trading', '2'),
('Long', '2');

INSERT INTO transaction (buy_date, buy, price, quantity, wallet_id, crypto_id, fiat) VALUES
('2022-01-22 19:10:25-07', 'true', '35000', '1', '1', '1577', 'usd'),
('2022-01-22 19:10:30-07', 'true', '3000', '1', '2', '4105', 'usd'),
('2022-01-21 20:10:25-07', 'true', '35000', '1', '3', '1577', 'usd'),
('2022-01-21 20:10:30-07', 'true', '3000', '1', '4', '4105', 'usd'),
('2022-01-22 19:10:25-07', 'true', '35000', '1', '1', '1577', 'usd'),
('2022-01-22 19:10:30-07', 'true', '3000', '1', '2', '4105', 'usd'),
('2022-01-21 20:10:25-07', 'true', '35000', '1', '3', '1577', 'usd'),
('2022-01-21 20:10:30-07', 'true', '3000', '1', '4', '4105', 'usd'),
('2022-01-22 19:10:25-07', 'true', '35000', '1', '1', '1577', 'usd'),
('2022-01-22 19:10:30-07', 'true', '3000', '1', '2', '4105', 'usd'),
('2022-01-21 20:10:25-07', 'true', '35000', '1', '3', '1577', 'usd'),
('2022-01-21 20:10:30-07', 'true', '3000', '1', '4', '4105', 'usd');

COMMIT;