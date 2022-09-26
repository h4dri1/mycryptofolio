const { walletService } = require('../services');

module.exports = {
    addWallet: async (req, res, next) => {
        try {
            const wallet = await walletService.addWallet(req, res, next);
            res.json(wallet);
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