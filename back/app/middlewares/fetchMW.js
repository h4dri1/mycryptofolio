const { Transaction } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const cryptos = await Transaction.getUserCrypto(req.params.id);
        if (!cryptos) {
            return res.status(500).json(error.message, true);
        };
        res.locals.data = cryptos;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message, true);
    }
}