-- Deploy mycryptofolio:testTransaction to pg

BEGIN;

INSERT INTO wallet (label, user_id) VALUES
('Day Trading', '1'),
('Long', '1'),
('Day Trading', '2'),
('Long', '2');

INSERT INTO transaction (buy_date, buy, price, quantity, wallet_id, crypto_id) VALUES
('2022-01-22 19:10:25-07', 'true', '35000', '1', '1', '1577'),
('2022-01-22 19:10:30-07', 'true', '3000', '1', '2', '4105'),
('2022-01-21 20:10:25-07', 'true', '35000', '1', '3', '1577'),
('2022-01-21 20:10:30-07', 'true', '3000', '1', '4', '4105'),
('2022-01-22 19:10:25-07', 'true', '35000', '1', '1', '1577'),
('2022-01-22 19:10:30-07', 'true', '3000', '1', '2', '4105'),
('2022-01-21 20:10:25-07', 'true', '35000', '1', '3', '1577'),
('2022-01-21 20:10:30-07', 'true', '3000', '1', '4', '4105'),
('2022-01-22 19:10:25-07', 'true', '35000', '1', '1', '1577'),
('2022-01-22 19:10:30-07', 'true', '3000', '1', '2', '4105'),
('2022-01-21 20:10:25-07', 'true', '35000', '1', '3', '1577'),
('2022-01-21 20:10:30-07', 'true', '3000', '1', '4', '4105');

COMMIT;