const jwt = require('../services/jwt');
const { Transaction, Crypto, Wallet } = require('../models');

module.exports = {
    getPortfolio: async (req, res) => {
        try {
            /////////////////////////////////////////////////////////////////////////////////
            const cryptos = res.locals.cryptos;

            let distribution;
            let objTransactions;
            let newObj = [];
            let objWallet = [];
            let portfolio = {};
            let objPerformance = {};
            let sumValue = 0;
            let sumBuy = 0;
            /////////////////////////////////////////////////////////////////////////////////
            if (req.params.wallet_id) {
                objTransactions = await Transaction.getUserTransactionByWallet(req.userId.id, req.params.wallet_id);
                distribution = await Transaction.getDistributionByWallet(req.userId.id, req.params.wallet_id)
            } else {
                objTransactions = await Transaction.getUserTransaction(req.userId.id);
                distribution = await Transaction.getDistribution(req.userId.id)
            };

            if (!objTransactions) {
                return res.status(500).json(error.message, true);
            };
            /////////////////////////////////////////////////////////////////////////////////
            for (const transac of cryptos) {
                sumBuy += parseInt(transac.investment);
                newObj.push({'id':transac.wallet_id, 'sum':0, 'label':transac.wallet_label}); 
            }

            for (const test in distribution) {
                sumValue += parseInt(distribution[test].value);
                newObj[test].sum = distribution[test].value
            }
            /////////////////////////////////////////////////////////////////////////////////
            const objRepartition = []
            for (const distrib of distribution) {
                if (req.params.wallet_id) {
                    delete distrib.wallet_id;
                    delete distrib.wallet_label;
                }
                delete distrib.user_id
                objRepartition[distrib.name] = {...distrib}
                objRepartition[distrib.name].distribution = (100 * distrib.value)/sumValue
            }
            /////////////////////////////////////////////////////////////////////////////////
            const pnl = sumValue - sumBuy;

            objPerformance.investment = sumBuy;
            objPerformance.actual_value = sumValue;
            objPerformance.pnl = pnl;
            /////////////////////////////////////////////////////////////////////////////////
            const empty = await Wallet.findWalletWithNoTransaction(req.userId.id);

            newObj.reduce((key, value) => {
            if (!key[value.id]) {
                key[value.id] = { id: value.id, sum: 0, label: value.label };
                objWallet.push(key[value.id]);
            }
            key[value.id].sum += value.sum;
            return key;
            }, {});

            if (empty) {
                for (const emp of empty) {
                    objWallet.push({'id':emp.id, 'sum': 0, 'label':emp.label});
                }
            };
            /////////////////////////////////////////////////////////////////////////////////
            portfolio.transactions = Object.values(objTransactions);
            portfolio.distribution = Object.values(objRepartition);
            portfolio.performance = objPerformance;
            portfolio.wallet = objWallet;
            /////////////////////////////////////////////////////////////////////////////////
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
            let bodyId = false;
            if (req.body.id) {
                const is_transaction = await Transaction.getTransactionByPk(req.body.id);
                if (is_transaction.length === 0) {
                    return res.status(500).json('No transaction with this id');
                }
                bodyId = true;
            };
            const is_owning_wallet = await Wallet.findWalletByUser(req.userId.id);
            if (is_owning_wallet.length === 0) {
                return res.status(500).json(`You have no wallet create one before add transaction`);
            } else {
                for (const own of is_owning_wallet) {
                    if (Number(req.params.wid) === own.id) {
                        own_wallet = true;
                    }
                };
                if (!own_wallet) {
                    return res.status(500).json(`You doesn't own this wallet`)
                };
            };    
            if (!req.body.buy) {
                const cryptos = await Transaction.getUserCrypto(req.userId.id);
                if (req.body.quantity > 0) {
                    return res.status(500).json('Selling quantity must be a negative number');
                }
                const wallet = cryptos.find(element => element.wallet_id === Number(req.params.wid) & element.coin_id === req.body.coin_id);
                if (wallet === undefined) {
                    return res.status(500).json('You are trying to sell coins that are not present in this wallet');
                }
                if (bodyId) {
                    const cryptos2 = await Transaction.getUserCryptoByWallet(req.userId.id, req.params.wid);
                    console.log(cryptos2)
                    const wallet2 = cryptos2.find(element => element.wallet_id === Number(req.params.wid) & element.coin_id === req.body.coin_id);
                    if ((wallet2.total + req.body.quantity) - wallet2.total > wallet.total) {
                        return res.status(500).json('You trying to sell more coin than you have');
                    }  
                } else {
                    if ((wallet.total + req.body.quantity) < 0) {
                        return res.status(500).json('You trying to sell more coin than you have');
                    }    
                }
            } else {
                if (req.body.quantity < 0) {
                    return res.status(500).json('Buy quantity must be a positive number');
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