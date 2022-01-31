export const GET_CRYPTO_LIST = 'GET_CRYPTO_LIST';
export const UPDATE_CRYPTO_LIST = 'UPDATE_CRYPTO_LIST';
export const GET_MORE_CRYPTOS = 'GET_MORE_CRYPTOS';
export const GET_MORE_CRYPTOS_LOADING = 'GET_MORE_CRYPTOS_LOADING';
export const UPDATE_CRYPTO_QUANTITY = 'UPDATE_CRYPTO_QUANTITY';
export const GET_ALL_CRYPTOS = 'GET_ALL_CRYPTOS';
export const UPDATE_ALL_CRYPTOS = 'UPDATE_ALL_CRYPTOS';
export const GET_CURRENT_PRICE = 'GET_CURRENT_PRICE';
export const SET_PRICE = 'SET_PRICE';

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

export const getCurrentPrice = (payload) => ({
  type: GET_CURRENT_PRICE,
  payload,
});

export const setPrice = (price) => ({
  type: SET_PRICE,
  payload: { currentPrice: price },
});
