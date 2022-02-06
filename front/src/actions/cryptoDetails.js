export const GET_CRYPTO_DESCRIPTION = 'GET_CRYPTO_DESCRIPTION';
export const GET_INDICATORS = 'GET_INDICATORS';
export const FETCH_CRYPTO_DATA = 'FETCH_CRYPTO_DATA';
export const FETCH_CRYPTO_DATA_SUCCESS = 'FETCH_CRYPTO_DATA_SUCCESS';
export const GET_PRICES = 'GET_PRICES';

export const fetchCryptoData = (payload) => ({
    type: FETCH_CRYPTO_DATA,
    payload,
});

export const fetchCryptoDataSuccess = (payload) => ({
    type: FETCH_CRYPTO_DATA_SUCCESS,
    payload,
});

// export const changeFieldValue = (value, key) => ({
//     type: CHANGE_FIELD_VALUE,
//     payload: {
//       value,
//       key,
//     },
//   });