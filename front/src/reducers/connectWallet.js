import {
    UPDATE_WALLET_ADRESS, UPDATE_WALLET_BALANCE
} from 'src/actions/connectWallet';

if (localStorage.getItem('wallet')) {
    var walletAddress = localStorage.getItem('wallet');
  } else {
    var walletAddress = 'Wallet';
}

export const initialState = {
    walletAddress: walletAddress,
    walletBalance: 0,
};

const connectWalletReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_WALLET_ADRESS:
            return {
                ...state,
                walletAddress: action.payload,
            };
        case UPDATE_WALLET_BALANCE:
            return {
                ...state,
                walletBalance: action.payload,
            };
        default:
            return state;
    }
}

export default connectWalletReducer;