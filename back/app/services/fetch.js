const fetch = require('cross-fetch');

module.exports = async (fetchData) => {
    try {
        const coins = await fetch(fetchData);
        return data = await coins.json();
    } catch (error) {
        console.log(error);
        throw error;
    }

}