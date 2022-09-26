const { portfolioService } = require('../utils');

module.exports = {
    getPortfolio: async (req, res, next) => {
        try {
            const portfolio = await portfolioService.getPortfolio(req, res, next);
            res.status(200).json(portfolio);
        } catch (err) {
            next(err);
        }
    }
};