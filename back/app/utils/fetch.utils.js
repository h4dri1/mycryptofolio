const fetch = require('cross-fetch');
const { PublicApiError } = require('../error/error');

// Fetch service

module.exports = async (url, header, body) => {
  const res = await fetch(url, header, body);
  if (!res) {
    throw new PublicApiError(url);
  }
  if (res.status === 404) {
    const data = { status: res.statusText };
    return data;
  }
  const data = await res.json();
  return data;
};
