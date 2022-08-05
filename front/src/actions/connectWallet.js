export const GET_WALLET_ADRESS = 'GET_WALLET_ADRESS';
export const UPDATE_WALLET_ADRESS = 'UPDATE_WALLET_ADRESS';
export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';
export const GET_WALLET_TOKENS = 'GET_WALLET_TOKENS';
export const UPDATE_WALLET_TOKENS = 'UPDATE_WALLET_TOKENS';
export const GET_WALLET_NFT = 'GET_WALLET_NFT';
export const UPDATE_WALLET_NFT = 'UPDATE_WALLET_NFT';
export const GET_WALLET_ENS = 'GET_WALLET_ENS';
export const UPDATE_WALLET_ENS = 'UPDATE_WALLET_ENS';
export const GET_WALLET_HISTORY = 'GET_WALLET_HISTORY';
export const UPDATE_WALLET_HISTORY = 'UPDATE_WALLET_HISTORY';

export const getWalletAddress = () => ({
    type: GET_WALLET_ADRESS,
});

export const updateWalletAddress = (payload) => ({
    type: UPDATE_WALLET_ADRESS,
    payload,
});

export const getWalletBalance = () => ({
    type: GET_WALLET_BALANCE,
});

export const updateWalletBalance = (payload) => ({
    type: UPDATE_WALLET_BALANCE,
    payload,
});

export const getWalletTokens = () => ({
    type: GET_WALLET_TOKENS
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

export const getWalletENS = () => ({
    type: GET_WALLET_ENS,
});

export const updateWalletENS = (payload) => ({
    type: UPDATE_WALLET_ENS,
    payload,
});

export const getWalletHistory = () => ({
    type: GET_WALLET_HISTORY,
});

export const updateWalletHistory = (payload) => ({
    type: UPDATE_WALLET_HISTORY,
    payload,
});
