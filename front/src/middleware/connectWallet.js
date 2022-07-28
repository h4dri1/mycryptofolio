import { getWalletBalance, 
        GET_WALLET_ADRESS, 
        GET_WALLET_BALANCE, 
        updateWalletAddress, 
        updateWalletBalance, 
        GET_WALLET_TOKENS, 
        updateWalletTokens, 
        getWalletTokens,
        GET_WALLET_NFT,
        updateWalletNFT,
        getWalletNFT,
        GET_WALLET_ENS,
        updateWalletENS,
        getWalletENS,
        } from "../actions/connectWallet";

import { ethers } from "ethers";

import axios from 'axios';

import { setDisplaySnackBar } from 'src/actions/settings';

import { setPending } from 'src/actions/settings';
import { Stroller } from "@mui/icons-material";

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const connectWallet = (store) => (next) => async (action) => {

    switch (action.type) {
        case GET_WALLET_ADRESS:
            store.dispatch(setPending())
            if (window.ethereum) {
                window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                        localStorage.setItem("wallet", res[0]);
                        store.dispatch(updateWalletAddress(res[0]))
                        store.dispatch(setPending())
                });  
            } else {
                if (!localStorage.getItem("wallet")) {
                    store.dispatch(setDisplaySnackBar({ severity: 'error', message: `Please install Metamask` }));
                    store.dispatch(setPending())
                } else {
                    localStorage.removeItem("wallet");
                    store.dispatch(setPending())
                }
            }
            next(action);
            break;
        case GET_WALLET_BALANCE:
            store.dispatch(setPending())
            var { walletAddress } = store.getState().connectWallet;
            window.ethereum
            .request({ 
              method: "eth_getBalance", 
              params: [walletAddress, "latest"] 
            })
            .then((balance) => {
              // Setting balance
                store.dispatch(updateWalletBalance(ethers.utils.formatEther(balance)))
                store.dispatch(setPending())
                
            });
            next(action);
            break;
        case GET_WALLET_TOKENS:
            store.dispatch(setPending())
            var { walletAddress } = store.getState().connectWallet;
            var { selectedCurrency } = store.getState().cryptos.cryptoList;
            axios({
                method: 'get',
                baseURL,
                url: `/token/${walletAddress}/${selectedCurrency}`,
                })
                .then((res) => {
                    store.dispatch(updateWalletTokens(res.data));
                    store.dispatch(setPending())
                    
                })
                .catch((err) => {
                    console.log(err)
                    store.dispatch(setPending())
                });
            next(action);
            break;
            case GET_WALLET_NFT:
                store.dispatch(setPending())
                var { walletAddress } = store.getState().connectWallet;
                axios({
                    method: 'get',
                    baseURL,
                    url: `/nft/${walletAddress}`,
                    })
                    .then((res) => {
                        store.dispatch(updateWalletNFT(res.data));
                        store.dispatch(setPending())
                        
                    })
                    .catch((err) => {
                        console.log(err)
                        store.dispatch(setPending())
                    });
                next(action);
                break;
            case GET_WALLET_ENS:
                store.dispatch(setPending())
                var { walletAddress } = store.getState().connectWallet;
                axios({
                    method: 'get',
                    baseURL,
                    url: `/ens/${walletAddress}`,
                    })
                    .then((res) => {
                        store.dispatch(updateWalletENS(res.data));
                        store.dispatch(setPending())
                        
                    })
                    .catch((err) => {
                        console.log(err)
                        store.dispatch(setPending())
                    });
                next(action);
                break;
        default:
        next(action);
        break;
    }
}

export default connectWallet;