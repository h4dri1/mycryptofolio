const jwt = require('../services/jwt');
const { Transaction, Crypto, Wallet } = require('../models');

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            const cryptos = res.locals.cryptos;
            const price = res.locals.price;

            let objTransactions;
            let portfolio = {};
            let value = {};
            let buy = {};
            let objRepartition = {};
            let objPerformance = {};
            let sumValue = 0;
            let sumBuy = 0;
            let total = {};

            if (req.params.wallet_id) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wallet_id);
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
            }

            if (!objTransactions) {
                return res.status(500).json(error.message, true);
            };

            for (const val of cryptos) {              
                if (!value[val.coin_id]) {
                    value[val.coin_id] = (val.total * price[val.coin_id].usd)
                    buy[val.coin_id] =  val.total * val.buy_price
                    total[val.coin_id] = val.total
                } else {
                    value[val.coin_id] = value[val.coin_id] + (val.total * price[val.coin_id].usd)
                    buy[val.coin_id] =  buy[val.coin_id] + (val.total * val.buy_price)
                    total[val.coin_id] = total[val.coin_id] + val.total
                }
            }

            for (const key in value) {
                sumValue += parseInt(value[key])
            }

            for (const key in buy) {
                sumBuy += parseInt(buy[key])
            }

            for (const crypto of cryptos) {
                objRepartition[crypto.coin_id] = {}
                if (value[crypto.coin_id]) {
                    objRepartition[crypto.coin_id].name = crypto.symbol
                    objRepartition[crypto.coin_id].quantity = total[crypto.coin_id]
                    objRepartition[crypto.coin_id].value = value[crypto.coin_id]
                    objRepartition[crypto.coin_id].distribution = (100 * value[crypto.coin_id])/sumValue;
                } else {
                    objRepartition = []
                }   
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

                const empty = await Wallet.findWalletWithNoTransaction(req.userId.id);

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

                newObj.filter((v) => {
                    return this[v.id]?
                      !Object.assign(objWallet[v.id], v):
                      (objWallet[v.id] = v);
                }, {});

                if (empty) {
                    for (const emp of empty) {
                        objWallet.push({'id':emp.id, 'sum':'0', 'label':emp.label});
                    }
                }

                portfolio.wallet = Object.values(objWallet);
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
            if (req.body.id) {
                const is_transaction = await Transaction.getTransactionByPk(req.body.id);
                if (is_transaction.length === 0) {
                    return res.status(500).json('No transaction with this id')
                }
            }
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
            const cryptos = await Transaction.getUserCrypto(req.userId.id);
            if (!req.body.buy) {
                if (req.body.quantity > 0) {
                    return res.status(500).json('Selling quantity must be a negative number')
                }
                const wallet = cryptos.find(element => element.wallet_id === Number(req.params.wid) & element.coin_id === req.body.coin_id);
                if (wallet === undefined) {
                    return res.status(500).json('You are trying to sell coins that are not present in this wallet')
                }
                if ((wallet.total + req.body.quantity) < 0) {
                    return res.status(500).json('You trying to sell more coin than you have')
                }                   
            } else {
                if (req.body.quantity < 0) {
                    return res.status(500).json('Buy quantity must be a positive number')
                }
            }           
            const crypto_id = await Crypto.findOneCrypto(req.body.coin_id, req.body.symbol);
            const instance = new Transaction(req.body);
            delete instance.coin_id;
            delete instance.symbol;
            instance.wallet_id = req.params.wid;
            instance.crypto_id = crypto_id[0].id;
            const transaction = await instance.save();
            res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
            res.setHeader('Authorization', jwt.makeToken(req.userId));
            if (transaction) {
                return res.status(201).json(transaction);
            }
            res.status(204).json('Update ok')
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    },

    deleteTransaction: async (req, res) => {
        try {
            const is_owning_wallet = await Transaction.getWalletIdByTransaction(req.params.tid);
            if (is_owning_wallet.length === 0) {
                return res.status(500).json(`No transaction with this id`, true);
            } else {
                if (req.userId.id !== is_owning_wallet[0].user_id) {
                    return res.status(500).json(`You doesn't own this wallet`, true); 
                }
                await Transaction.delete(req.params.tid);
                res.setHeader('Access-Control-Expose-Headers', 'Authorization'); 
                res.setHeader('Authorization', jwt.makeToken(req.userId));
                res.status(204).json('delete ok');
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }
};