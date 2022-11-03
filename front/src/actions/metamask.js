export const GET_CHAIN_ID = 'GET_CHAIN_ID';
export const GET_CURRENT_ACCOUNT = 'GET_CURRENT_ACCOUNT';
export const GET_CONNECT_ACCOUNT = 'GET_CONNECT_ACCOUNT';
export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';

export const getChainId = () => ({
  type: GET_CHAIN_ID,
});

export const getCurrentAccount = (payload, change) => ({
  type: GET_CURRENT_ACCOUNT,
  payload,
  change,
});

export const getConnectAccount = () => ({
  type: GET_CONNECT_ACCOUNT,
});

export const getWalletBalance = (payload) => ({
  type: GET_WALLET_BALANCE,
  payload,
});
