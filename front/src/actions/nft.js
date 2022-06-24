export const GET_MORE_NFT_LOADING = 'GET_MORE_CRYPTOS_LOADING';
export const GET_NFT_LIST = 'GET_NFT_LIST';
export const UPDATE_NFT_LIST = 'UPDATE_NFT_LIST';
export const GET_MORE_NFT = 'GET_MORE_NFT';
export const UPDATE_NFT_QUANTITY = 'UPDATE_NFT_QUANTITY';
export const RESET_NFT_QUANTITY = 'RESET_NFT_QUANTITY';

export const getNFTList = () => ({
  type: GET_NFT_LIST,
});

export const updateNFTList = (payload) => ({
  type: UPDATE_NFT_LIST,
  payload,
});

export const getMoreNFT = () => ({
  type: GET_MORE_NFT,
});

export const getMoreNFTLoading = () => ({
  type: GET_MORE_NFT_LOADING,
});

export const updateNFTQuantity = () => ({
  type: UPDATE_NFT_QUANTITY,
});

export const resetNFTQuantity = () => ({
  type: RESET_NFT_QUANTITY,
})
