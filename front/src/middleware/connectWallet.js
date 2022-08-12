import {GET_WALLET_ADRESS, 
        GET_WALLET_BALANCE, 
        updateWalletAddress, 
        updateWalletBalance, 
        GET_WALLET_TOKENS, 
        updateWalletTokens, 
        getWalletTokens,
        GET_WALLET_NFT,
        updateWalletNFT,
        GET_WALLET_ENS,
        updateWalletENS,
        GET_WALLET_HISTORY,
        updateWalletHistory,
        } from "../actions/connectWallet";

import axios from 'axios';

import { setDisplaySnackBar } from 'src/actions/settings';

import { setPending } from 'src/actions/settings';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const connectWallet = (store) => (next) => async (action) => {

    switch (action.type) {
        case GET_WALLET_ADRESS:
            
            if (window.ethereum) {
                window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) => {
                        localStorage.setItem("wallet", res[0]);
                        store.dispatch(updateWalletAddress(res[0]))
                        
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
                store.dispatch(updateWalletBalance(balance))
                store.dispatch(getWalletTokens())
                
                
            });
            next(action);
            break;
        case GET_WALLET_TOKENS:
            
            var { walletAddress, walletBalance } = store.getState().connectWallet;
            var { selectedCurrency } = store.getState().cryptos.cryptoList;
            axios({
                method: 'get',
                baseURL,
                url: `/token/${walletAddress}/${selectedCurrency}/${walletBalance}/eth`,
                })
                .then((res) => {
                    store.dispatch(updateWalletTokens(res.data));
                    
                    
                })
                .catch((err) => {
                    console.log(err)
                    
                });
            next(action);
            break;
            case GET_WALLET_NFT:
                
                var { walletAddress } = store.getState().connectWallet;
                axios({
                    method: 'get',
                    baseURL,
                    url: `/nft/${walletAddress}`,
                    })
                    .then((res) => {
                        store.dispatch(updateWalletNFT(res.data));
                        
                        
                    })
                    .catch((err) => {
                        console.log(err)
                        
                    });
                next(action);
                break;
            case GET_WALLET_ENS:
                
                var { walletAddress } = store.getState().connectWallet;
                if (walletAddress !== 'Wallet') {
                    axios({
                        method: 'get',
                        baseURL,
                        url: `/ens/${walletAddress}`,
                        })
                        .then((res) => {
                            store.dispatch(updateWalletENS(res.data));
                            
                            
                        })
                        .catch((err) => {
                            console.log(err)
                            
                        });
                }
                next(action);
                break;
            case GET_WALLET_HISTORY:
                
                var { walletAddress } = store.getState().connectWallet;
                axios({
                    method: 'get',
                    baseURL,
                    url: `/tokens/history/${walletAddress}`,
                    })
                    .then((res) => {
                        store.dispatch(updateWalletHistory(res.data));
                        
                        
                    })
                    .catch((err) => {
                        console.log(err)
                        
                    });
                next(action);
                break;
        default:
        next(action);
        break;
    }
}

export default connectWallet;