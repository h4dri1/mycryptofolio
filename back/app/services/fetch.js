const fetch = require('cross-fetch');
const { PublicApiError } = require('../error');

// Fetch service

module.exports = async (fetchData) => {
    const coins = await fetch(fetchData);
    if (!coins) {
        throw new PublicApiError(fetchData);
    }
    if (coins.status === 404) {
        return data = {status: coins.statusText};
    } else {
        return data = await coins.json();
    }
}