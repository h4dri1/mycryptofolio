export const GET_CRYPTO_LIST = 'GET_CRYPTO_LIST';
export const UPDATE_CRYPTO_LIST = 'UPDATE_CRYPTO_LIST';
export const GET_MORE_CRYPTOS = 'GET_MORE_CRYPTOS';
export const GET_MORE_CRYPTOS_LOADING = 'GET_MORE_CRYPTOS_LOADING';
export const GET_MORE_NFT_LOADING = 'GET_MORE_CRYPTOS_LOADING';
export const UPDATE_CRYPTO_QUANTITY = 'UPDATE_CRYPTO_QUANTITY';
export const GET_CURRENT_PRICE = 'GET_CURRENT_PRICE';
export const SET_PRICE = 'SET_PRICE';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const GET_CRYPTO_TREND = 'GET_CRYPTO_TREND';
export const UPDATE_CRYPTO_TREND = 'UPDATE_CRYPTO_TREND';
export const GET_NFT_TREND = 'GET_NFT_TREND';
export const UPDATE_NFT_TREND = 'UPDATE_NFT_TREND';
export const GET_FEAR_GREED_INDEX = 'GET_FEAR_GREED_INDEX';
export const UPDATE_FEAR_GREED_INDEX = 'UPDATE_FEAR_GREED_INDEX';
export const GET_NFT_LIST = 'GET_NFT_LIST';
export const UPDATE_NFT_LIST = 'UPDATE_NFT_LIST';

export const getNFTList = () => ({
  type: GET_NFT_LIST,
});

export const updateNFTList = (payload) => ({
  type: UPDATE_NFT_LIST,
  payload,
})

export const getFearGreedIndex = () => ({
  type: GET_FEAR_GREED_INDEX,
})

export const updateFearGreedIndex = (payload) => ({
  type: UPDATE_FEAR_GREED_INDEX,
  payload,
})

export const getNFTTrend = () => ({
  type: GET_NFT_TREND,
})

export const updateNFTTrend = (payload) => ({
  type: UPDATE_NFT_TREND,
  payload
})

export const getCryptoList = () => ({
  type: GET_CRYPTO_LIST,
});

export const getCryptoTrend = () => ({
  type: GET_CRYPTO_TREND,
});

export const updateCryptoTrend = (payload) => ({
  type: UPDATE_CRYPTO_TREND,
  payload
});

export const updateCurrency = (payload) => ({
  type: UPDATE_CURRENCY,
  payload,
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

export const getMoreNFTsLoading = () => ({
  type: GET_MORE_NFT_LOADING,
});

export const updateCryptoQuantity = () => ({
  type: UPDATE_CRYPTO_QUANTITY,
});

export const getCurrentPrice = (payload) => ({
  type: GET_CURRENT_PRICE,
  payload,
});

export const setPrice = (price) => ({
  type: SET_PRICE,
  payload: { currentPrice: price },
});
