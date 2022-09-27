const { walletService } = require('../services');

module.exports = {
    addWallet: async (req, res, next) => {
        try {
            const wallet = await walletService.addWallet(req, res, next);
            if (wallet) {
                res.status(201).json(wallet);
            } else {
                res.status(204).json('wallet modified');
            }
        } catch (err) {
            next(err);
        }
    },

    deleteWallet: async (req, res, next) => {
        try {
            await walletService.deleteWallet(req, res, next);
            return res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
};