const Crypto = require('../models/crypto');
const cache = require('../services/cache');

module.exports = {
    getAllCryptos: async (req, res) => {
        try {
            console.log('Data depuis Postgres');
            const cryptos = await Crypto.findAll();
            console.log('Appel de response.json');
            if (!cryptos) {
                return null;
            };
            return res.status(200).json(cryptos);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};