const fetch = require('cross-fetch');

module.exports = async (fetchData) => {
    const coins = await fetch(fetchData);
    return data = await coins.json();
}