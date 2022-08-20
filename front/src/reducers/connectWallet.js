import {
    UPDATE_WALLET_ADRESS, UPDATE_WALLET_BALANCE, UPDATE_WALLET_TOKENS, UPDATE_WALLET_NFT, UPDATE_WALLET_ENS, UPDATE_WALLET_HISTORY, UPDATE_WALLET_NETWORK
} from 'src/actions/connectWallet';

if (localStorage.getItem('wallet')) {
    var walletAddress = localStorage.getItem('wallet');
  } else {
    var walletAddress = 'Wallet';
}

export const initialState = {
    walletAddress: walletAddress,
    walletBalance: 0,
    walletTokens: [],
    walletNFT: [],
    walletENS: null,
    walletHistory: [],
    walletNetwork: '',
};

const connectWalletReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_WALLET_ADRESS:
            localStorage.setItem('wallet', action.payload);
            return {
                ...state,
                walletAddress: action.payload,
            };
        case UPDATE_WALLET_BALANCE:
            return {
                ...state,
                walletBalance: action.payload,
            };
        case UPDATE_WALLET_TOKENS:
            return {
                ...state,
                walletTokens: action.payload,
            };
        case UPDATE_WALLET_NFT:
            return {
                ...state,
                walletNFT: action.payload,
            };
        case UPDATE_WALLET_ENS:
            return {
                ...state,
                walletENS: action.payload,
            };
        case UPDATE_WALLET_HISTORY:
            return {
                ...state,
                walletHistory: action.payload,
            };
        case UPDATE_WALLET_NETWORK:
            return {
                ...state,
                walletNetwork: action.payload,
            };
        default:
            return state;
    }
}

export default connectWalletReducer;