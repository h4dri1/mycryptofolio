export const GET_CRYPTO_LIST = 'GET_CRYPTO_LIST';
export const UPDATE_CRYPTO_LIST = 'UPDATE_CRYPTO_LIST';
export const GET_MORE_CRYPTOS = 'GET_MORE_CRYPTOS';
export const GET_MORE_CRYPTOS_LOADING = 'GET_MORE_CRYPTOS_LOADING';
export const UPDATE_CRYPTO_QUANTITY = 'UPDATE_CRYPTO_QUANTITY';
export const GET_ALL_CRYPTOS = 'GET_ALL_CRYPTOS';
export const UPDATE_ALL_CRYPTOS = 'UPDATE_ALL_CRYPTOS';

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

export const getMoreCryptosLoading = () => ({
  type: GET_MORE_CRYPTOS_LOADING,
});

export const updateCryptoQuantity = () => ({
  type: UPDATE_CRYPTO_QUANTITY,
});

export const getAllCryptos = () => ({
  type: GET_ALL_CRYPTOS,
});

export const updateAllCryptos = (payload) => ({
  type: UPDATE_ALL_CRYPTOS,
  payload,
});
