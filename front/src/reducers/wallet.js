import {
    UPDATE_WALLET_ENS, 
    UPDATE_CHAIN_ID, 
    UPDATE_CONNECT_ACCOUNT, 
    UPDATE_WALLET_BALANCE,
    UPDATE_WALLET_TOKENS, 
    UPDATE_WALLET_NFT,
    UPDATE_WALLET_HISTORY
} from 'src/actions/wallet';

export const initialState = {
    walletAddress: localStorage.getItem('wallet') || 'Wallet',
    walletBalance: 0,
    walletTokens: [],
    walletNFT: [],
    walletENS: localStorage.getItem('walletENS') || 'Wallet',
    walletHistory: [],
    walletNetwork: '',
};

const wallet = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_CHAIN_ID:
            return {
                ...state,
                walletNetwork: action.payload,
            };
        case UPDATE_CONNECT_ACCOUNT:
            return {
                ...state,
                walletAddress: action.payload,
            };
        case UPDATE_WALLET_ENS:
            return {
                ...state,
                walletENS: action.payload,
            };
        case UPDATE_WALLET_BALANCE:
            return {
                ...state,
                walletBalance: action.payload,
            };
        case UPDATE_WALLET_TOKENS:
            return {
                ...state,
                walletTokens: action.payload
            }
        case UPDATE_WALLET_NFT:
            return {
                ...state,
                walletNFT: action.payload
            }
        case UPDATE_WALLET_HISTORY:
            return {
                ...state,
                walletHistory: action.payload,
            };
        default:
        return state;
    }
}

export default wallet;