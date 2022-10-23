import {
    getWalletBalance,
    GET_CHAIN_ID,
    GET_CONNECT_ACCOUNT,
    GET_CURRENT_ACCOUNT,
    GET_WALLET_BALANCE,
    getChainId
} from "../actions/metamask";

import {
    updateChainId, 
    updateConnectAccount, 
    getWalletENS,
    updateWalletBalance,
    getWalletTokens,
    getWalletNFT,
    getWalletHistory
} from "../actions/wallet"

import detectEthereumProvider from '@metamask/detect-provider';

import { setDisplaySnackBar } from 'src/actions/settings';

const metamask = (store) => (next) => async (action) => {

    const handleAccountsChanged = async (accounts) => {
        var { walletAddress } = store.getState().wallet;
        if (accounts.length === 0 && localStorage.getItem('wallet') === 'Wallet') {
            // MetaMask is locked or the user has not connected any accounts
            //if (localStorage.getItem('wallet') === 'Wallet') {
                console.log('Please connect to MetaMask.');
            //}
        } else if (accounts[0] !== walletAddress && accounts.length > 0 && !localStorage.getItem('wallet')) {
            localStorage.setItem('wallets', JSON.stringify([{address: accounts[0]}]));
            localStorage.setItem('wallet', accounts[0]);
            await store.dispatch(getChainId())
            await store.dispatch(updateConnectAccount(accounts[0]))
            await store.dispatch(getWalletENS());
            await store.dispatch(getWalletBalance());
        } else {
            await store.dispatch(getChainId());
            await store.dispatch(getWalletENS());
            await store.dispatch(getWalletBalance('getTokens'));
            await store.dispatch(getWalletNFT());
            await store.dispatch(getWalletHistory());
        }
    }

    switch (action.type) {
        case GET_CHAIN_ID:
            var { walletNetwork } = store.getState().wallet;
            const chainId = await window.ethereum.networkVersion;
            if (walletNetwork !== chainId) {
                await store.dispatch(updateChainId(chainId))
                //window.location.reload();
            }
        next(action);
        break;
        case GET_CURRENT_ACCOUNT:
            // Payload is the current account when wallet change
            // If no payload get the current account with metamask
            if (!action.payload) {
                const provider = await detectEthereumProvider();
                if (provider) {
                    window.ethereum
                        .request({ method: 'eth_accounts' })
                        .then((accounts) => {
                            handleAccountsChanged(accounts)
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    } else {
                        store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
                    }
            } else {
                // Get changing wallet address
                // Set new wallet address to localStorage
                // Call handleAccountsChanged to update wallet address and balance
                // If account disconnect but present in localstorage keep the wallet address
                if (localStorage.getItem('wallets')) {
                    const wallets = JSON.parse(localStorage.getItem('wallets'));
                    if (wallets.filter(w => w.address === action.payload[0]).length === 0) {
                        wallets.push({address: action.payload[0]});
                        localStorage.setItem('wallets', JSON.stringify(wallets));
                        localStorage.setItem('wallet', action.payload[0]);
                        await store.dispatch(updateConnectAccount(action.payload[0]))
                        handleAccountsChanged(action.payload)
                    } else if (!action.change) {
                        localStorage.setItem('wallet', action.payload[0]);
                        await store.dispatch(updateConnectAccount(action.payload[0]))
                        handleAccountsChanged(action.payload[0])
                    } else {
                        await store.dispatch(updateConnectAccount(action.payload[0]))
                        handleAccountsChanged(action.payload[0])
                    }
                }
            }
        next(action);
        break;
        case GET_CONNECT_ACCOUNT:
            const provider = await detectEthereumProvider();
            if (provider) {
                window.ethereum
                    .request({ method: 'eth_requestAccounts' })
                    .then((accounts) => {
                        handleAccountsChanged(accounts)
                    })

                .catch((err) => {
                    if (err.code === 4001) {
                        // EIP-1193 userRejectedRequest error
                        // If this happens, the user rejected the connection request.
                        store.dispatch(setDisplaySnackBar({ severity: 'error', message: 'Please connect to Metamask' }));
                    } else {
                        console.error(err);
                    }
                });
            } else {
                store.dispatch(setDisplaySnackBar({ severity: 'error', message: 'Please install Metamask Extention' }));
            }
        next(action);
        break;
        case GET_WALLET_BALANCE:
            var { walletAddress } = store.getState().wallet;
            window.ethereum
            .request({ 
              method: "eth_getBalance", 
              params: [walletAddress, "latest"] 
            })
            .then(async (balance) => {
              // Setting balance
                await store.dispatch(updateWalletBalance(balance))
                if (action.payload === 'getTokens') {
                    await store.dispatch(getWalletTokens())
                }
            });
        next(action);
        break;
    default:
        next(action);
        break;
    }
}

export default metamask;