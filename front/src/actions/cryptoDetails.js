export const FETCH_CRYPTO_DATA = 'FETCH_CRYPTO_DATA';
export const FETCH_CRYPTO_DATA_SUCCESS = 'FETCH_CRYPTO_DATA_SUCCESS';

export const fetchCryptoData = (payload, days) => ({
    type: FETCH_CRYPTO_DATA,
    payload, days,
});

export const fetchCryptoDataSuccess = (payload) => ({
    type: FETCH_CRYPTO_DATA_SUCCESS,
    payload,
});
