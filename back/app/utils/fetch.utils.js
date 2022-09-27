const fetch = require('cross-fetch');
const { PublicApiError } = require('../error/error');

// Fetch service

module.exports = async (url, header, body) => {
    const res = await fetch(url, header, body);
    if (!res) {
        throw new PublicApiError(url);
    }
    if (res.status === 404) {
        return data = {status: res.statusText};
    } else {
        return data = await res.json();
    }
}