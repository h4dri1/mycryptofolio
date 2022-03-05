const fetch = require('cross-fetch');
const { PublicApiError } = require('../error');

module.exports = async (fetchData) => {
    const coins = await fetch(fetchData);
    if (!coins) {
        throw new PublicApiError(fetchData);
    }
    return data = await coins.json();
}