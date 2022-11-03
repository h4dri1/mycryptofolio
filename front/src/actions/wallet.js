export const GET_WALLET_ENS = 'GET_WALLET_ENS';
export const UPDATE_WALLET_ENS = 'UPDATE_WALLET_ENS';
export const UPDATE_CHAIN_ID = 'UPDATE_CHAIN_ID';
export const UPDATE_CONNECT_ACCOUNT = 'UPDATE_CONNECT_ACCOUNT';
export const UPDATE_CURRENT_ACCOUNT = 'UPDATE_CURRENT_ACCOUNT';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';
export const GET_WALLET_TOKENS = 'GET_WALLET_TOKENS';
export const UPDATE_WALLET_TOKENS = 'UPDATE_WALLET_TOKENS';
export const GET_WALLET_NFT = 'GET_WALLET_NFT';
export const UPDATE_WALLET_NFT = 'UPDATE_WALLET_NFT';
export const GET_WALLET_HISTORY = 'GET_WALLET_HISTORY';
export const UPDATE_WALLET_HISTORY = 'UPDATE_WALLET_HISTORY';

export const updateChainId = (payload) => ({
  type: UPDATE_CHAIN_ID,
  payload,
});

export const updateCurrentAccount = (payload) => ({
  type: UPDATE_CURRENT_ACCOUNT,
  payload,
});

export const updateConnectAccount = (payload) => ({
  type: UPDATE_CONNECT_ACCOUNT,
  payload,
});

export const getWalletENS = () => ({
  type: GET_WALLET_ENS,
});

export const updateWalletENS = (payload) => ({
  type: UPDATE_WALLET_ENS,
  payload,
});

export const updateWalletBalance = (payload) => ({
  type: UPDATE_WALLET_BALANCE,
  payload,
});

export const getWalletTokens = () => ({
  type: GET_WALLET_TOKENS,
});

export const updateWalletTokens = (payload) => ({
  type: UPDATE_WALLET_TOKENS,
  payload,
});

export const getWalletNFT = () => ({
  type: GET_WALLET_NFT,
});

export const updateWalletNFT = (payload) => ({
  type: UPDATE_WALLET_NFT,
  payload,
});

export const getWalletHistory = () => ({
  type: GET_WALLET_HISTORY,
});

export const updateWalletHistory = (payload) => ({
  type: UPDATE_WALLET_HISTORY,
  payload,
});
