export const FETCH_CRYPTO_DATA = 'FETCH_CRYPTO_DATA';
export const UPDATE_CRYPTO_DATA = 'UPDATE_CRYPTO_DATA';

export const fetchCryptoData = (payload, days) => ({
    type: FETCH_CRYPTO_DATA,
    payload, days,
});

export const updateCryptoData = (payload) => ({
    type: UPDATE_CRYPTO_DATA,
    payload,
});
