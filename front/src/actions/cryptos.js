export const GET_CRYPTO_LIST = 'GET_CRYPTO_LIST';
export const UPDATE_CRYPTO_LIST = 'UPDATE_CRYPTO_LIST';
export const GET_MORE_CRYPTOS = 'GET_MORE_CRYPTOS';
export const UPDATE_CRYPTO_QUANTITY = 'UPDATE_CRYPTO_QUANTITY';

export const getCryptoList = () => ({
    type: GET_CRYPTO_LIST,
});

export const updateCryptoList = (payload) => ({
    type: UPDATE_CRYPTO_LIST,
    payload,
});

export const getMoreCryptos = () => ({
    type: GET_MORE_CRYPTOS,
});

export const updateCryptoQuantity = () => ({
    type: UPDATE_CRYPTO_QUANTITY,
});
