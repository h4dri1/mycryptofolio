const fetch = require('cross-fetch');

module.exports = {
    getTopCryptoPrice: async (req, res) => {
        try {
            const coins = await fetch(`//api.coingecko.com/api/v3/coins/markets?vs_currency=${req.params.vs}&order=market_cap_desc&per_page=${req.params.nb}&page=1&sparkline=false`);
            const data = await coins.json();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(520).json(error.name);
        }
    },


}