const { Transaction, Wallet } = require('../models');

module.exports = async (req, res, next) => {
    try {
        let own_wallet = false;
        let bodyId = false;
        let is_transaction;
        if (req.body.id) {
            is_transaction = await Transaction.getTransactionByPk(req.body.id);
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
                const wallet2 = cryptos2.find(element => element.wallet_id === Number(req.params.wid) & element.coin_id === req.body.coin_id);
                if (Number(wallet2.total) === Number(is_transaction[0].quantity) | (Math.abs(req.body.quantity) + is_transaction[0].quantity) > wallet2.total) {
                    return res.status(500).json('You trying to sell more coin than you have');
                }  
            } else {
                if ((Number(wallet.total) + Number(req.body.quantity)) < 0) {
                    return res.status(500).json('You trying to sell more coin than you have');
                }    
            }
        } else {
            if (Number(req.body.quantity) < 0) {
                return res.status(500).json('Buy quantity must be a positive number');
            }
        }           
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message, true);
    }
}