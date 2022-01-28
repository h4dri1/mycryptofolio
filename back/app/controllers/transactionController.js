const jwt = require('../services/jwt')
const { Transaction, Wallet } = require('../models');
const { id } = require('../schemas/loginSchema');
const createApplication = require('express/lib/express');

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            const cryptos = res.locals.cryptos;
            const price = res.locals.price

            let objTransactions;
            let portfolio = {};
            let value = {};
            let buy = {}
            let objRepartition = {};
            let objPerformance = {};
            let objWallet = {};
            let sumValue = 0;
            let sumBuy = 0;

            if (req.params.wallet_id) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wallet_id);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
            }

            if (!objTransactions) {
                return res.status(500).json(error.message, true);
            };

            for (const val of cryptos) {
                value[val.coin_id] = val.total * price[val.coin_id].usd
                buy[val.coin_id] =  val.total * val.buy_price
            }

            for (const key in value) {
                sumValue += parseInt(value[key])
            }

            for (const key in buy) {
                sumBuy += parseInt(buy[key])
            }

            for (const crypto of cryptos) {
                objRepartition[crypto.coin_id] = {}
                objRepartition[crypto.coin_id].name = crypto.symbol
                objRepartition[crypto.coin_id].quantity = crypto.total
                objRepartition[crypto.coin_id].value = value[crypto.coin_id]
                objRepartition[crypto.coin_id].distribution = (100 * value[crypto.coin_id])/sumValue;
            }

            const pnl = sumValue - sumBuy;

            objPerformance.investment = sumBuy;
            objPerformance.actual_value = sumValue;
            objPerformance.pnl = pnl;

            const newObjTransactions = Object.values(objTransactions);
            const newObjRepartition = Object.values(objRepartition);

            portfolio.transactions = newObjTransactions;
            portfolio.distribution = newObjRepartition;
            portfolio.performance = objPerformance;

            if (!req.params.wallet_id) {
                let newObj = []
                let sum = 0;
                let id = 0;
                let id2 = 1;

                for (const coin of cryptos) {
                    sum = sum + coin.total * price[coin.coin_id].usd
                    id = coin.wallet_id
                    if (id === id2) {
                        newObj.push({'id':coin.wallet_id, 'sum':sum, 'label':coin.wallet_label});
                    } else {
                        sum = coin.total * price[coin.coin_id].usd;
                        newObj.push({'id':coin.wallet_id, 'sum':sum, 'label':coin.wallet_label});
                        id2 = coin.wallet_id
                    }
                }

                const objWallet = newObj.filter((v) => {
                    return this[v.id]?
                      !Object.assign(this[v.id], v):
                      (this[v.id] = v);
                }, {});

                portfolio.wallet = objWallet;
            }

            res.setHeader('Access-Control-Expose-Headers', 'Authorization');
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(200).json(portfolio);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};