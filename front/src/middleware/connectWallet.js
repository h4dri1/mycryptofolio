import { getWalletBalance, GET_WALLET_ADRESS, GET_WALLET_BALANCE, updateWalletAddress, updateWalletBalance } from "../actions/connectWallet";

import { ethers } from "ethers";

import { setDisplaySnackBar } from 'src/actions/settings';

const connectWallet = (store) => (next) => (action) => {

    switch (action.type) {
        case GET_WALLET_ADRESS:
            if (window.ethereum) {
                window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                    if (res[0] !== localStorage.getItem('wallet')) {
                        localStorage.setItem("wallet", res[0]);
                        store.dispatch(updateWalletAddress(res[0]))
                        store.dispatch(getWalletBalance())
                    }
                });  
            } else {
                if (!localStorage.getItem("wallet")) {
                    store.dispatch(setDisplaySnackBar({ severity: 'error', message: `Please install Metamask` }));
                } else {
                    localStorage.removeItem("wallet");
                }
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