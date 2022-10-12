const { Favorite } = require('../models');
const { WalletService } = require('../error/error.services');

module.exports = {
    getFavoriteByUserId: async (req, res, next) => {
        try {
            const favorite = await Favorite.getFavoriteByUserId(req.userId.id);
            return favorite
        } catch (err) {
            throw new WalletService(err);
        }
    },

    addFavorite: async (req, res, next) => {
        try {
            const favorite = await Favorite.addFavorite(req.userId.id, req.params.id);
            return favorite
        } catch (err) {
            throw new WalletService(err);
        }
    },

    deleteFavorite: async (req, res, next) => {
        try {
            await Favorite.deleteFavorite(req.userId.id, req.params.id);
        } catch (err) {
            throw new WalletService(err);
        }
    }
};