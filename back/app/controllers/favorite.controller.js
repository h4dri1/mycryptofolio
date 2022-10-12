const { favoriteService } = require('../services');

module.exports = {
    getFavoriteByUserId: async (req, res, next) => {
        try {
            const favorite = await favoriteService.getFavoriteByUserId(req, res, next);
            res.status(200).json(favorite);
        } catch (err) {
            next(err);
        } 
    },

    addFavorite: async (req, res, next) => {
        try {
            const newFav = await favoriteService.addFavorite(req, res, next);
            res.status(204).json(newFav);
        } catch (err) {
            next(err);
        }
    },

    deleteFavorite: async (req, res, next) => {
        try {
            await favoriteService.deleteFavorite(req, res, next);
            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
};