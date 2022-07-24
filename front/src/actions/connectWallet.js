export const GET_WALLET_ADRESS = 'GET_WALLET_ADRESS';
export const UPDATE_WALLET_ADRESS = 'UPDATE_WALLET_ADRESS';
export const GET_WALLET_BALANCE = 'GET_WALLET_BALANCE';
export const UPDATE_WALLET_BALANCE = 'UPDATE_WALLET_BALANCE';

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