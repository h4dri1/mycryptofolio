const fetch = require('cross-fetch');
const { PublicApiError } = require('./error');

module.exports = async (fetchData) => {
    const coins = await fetch(fetchData);
    if (!coins) {
        throw { 
            url: fetchData,
            error : new PublicApiError().message
        }
    }
    return data = await coins.json();
}