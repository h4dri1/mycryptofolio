export const GET_CRYPTO_LIST = 'GET_CRYPTO_LIST';
export const UPDATE_CRYPTO_LIST = 'UPDATE_MORE_CRYPTOS';

export const getCryptoList = () => ({
    type: GET_CRYPTO_LIST,
});

export const updateCryptoList = (payload) => ({
    type: UPDATE_CRYPTO_LIST,
    payload,
});
