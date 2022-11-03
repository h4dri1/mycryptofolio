export const FETCH_NFT_DATA = 'FETCH_NFT_DATA';
export const FETCH_NFT_DATA_SUCCESS = 'FETCH_NFT_DATA_SUCCESS';

export const fetchNFTData = (payload) => ({
  type: FETCH_NFT_DATA,
  payload,
});

export const fetchNFTDataSuccess = (payload) => ({
  type: FETCH_NFT_DATA_SUCCESS,
  payload,
});
