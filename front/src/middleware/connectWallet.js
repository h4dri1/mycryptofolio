import { getWalletBalance, GET_WALLET_ADRESS, GET_WALLET_BALANCE, updateWalletAddress, updateWalletBalance } from "../actions/connectWallet";

import { ethers } from "ethers";

const connectWallet = (store) => (next) => (action) => {

    switch (action.type) {
        case GET_WALLET_ADRESS:
            if (window.ethereum) {
                window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                    store.dispatch(updateWalletAddress(res[0]))
                    store.dispatch(getWalletBalance())
                });  
            } else {
                alert('Please install MetaMask');
            }
            next(action);
            break;
        case GET_WALLET_BALANCE:
            var { walletAddress } = store.getState().connectWallet;
            window.ethereum
            .request({ 
              method: "eth_getBalance", 
              params: [walletAddress, "latest"] 
            })
            .then((balance) => {
              // Setting balance
                store.dispatch(updateWalletBalance(ethers.utils.formatEther(balance)))
            });
        default:
        next(action);
        break;
    }
}

export default connectWallet;