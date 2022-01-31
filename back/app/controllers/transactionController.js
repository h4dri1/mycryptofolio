const jwt = require('../services/jwt');
const { Transaction, Crypto, Wallet } = require('../models');

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
                let objWallet = [];
                let newObj = [];
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

                objWallet = newObj.filter((v) => {
                    return this[v.id]?
                      !Object.assign(this[v.id], v):
                      (this[v.id] = v);
                }, {});

                const newObjWallet = Object.values(this);

                portfolio.wallet = newObjWallet;
            }

            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(200).json(portfolio);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    addTransaction: async (req, res) => {
        try {
            let own_wallet = false;
            const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
            if (is_owning_wallet.length === 0) {
                return res.status(500).json(`You have no wallet create one before add transaction`);
            } else {
                for (const own of is_owning_wallet) {
                    if (Number(req.params.wid) === own.id) {
                        own_wallet = true;
                    }
                }
                if (!own_wallet) {
                    return res.status(500).json(`You doesn't own this wallet`)
                }
            }
            const crypto_id = await Crypto.findOneCrypto(req.body.coin_id, req.body.symbol);
            const instance = new Transaction(req.body);
            delete instance.coin_id;
            delete instance.symbol;
            instance.wallet_id = req.params.wid;
            instance.crypto_id = crypto_id[0].id;
            const transaction = await instance.save();
            if (transaction) {
                return res.status(201).json(transaction);
            }
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            res.status(204).json('Update ok')
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const is_owning_wallet = await Transaction.getWalletIdByTransaction(req.params.tid);
            if (is_owning_wallet.length === 0) {
                return res.status(500).json(`No transaction with this id`);
            } else {
                if (req.userId.id !== is_owning_wallet[0].user_id) {
                    return res.status(500).json(`You doesn't own this wallet`); 
                }
                await Transaction.delete(req.params.tid);
                res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
                res.setHeader('Authorization', jwt.makeToken(req.userId));
                res.status(204)
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message, true);
        }
    }
};