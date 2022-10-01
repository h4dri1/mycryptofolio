/* eslint-disable react/function-component-definition */
import { AppBar, Toolbar, Container, useMediaQuery, Box, Link } from '@mui/material';
import React, { Suspense, lazy } from 'react';

import ToggleMode from './ToggleMode';
import RefCurrency from './RefCurrency';
import { useSelector } from 'react-redux';

import Logo from 'src/components/Navbar/Logo';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import ConnectWallet from './ConnectWallet'

const Indicators = lazy(() => import('./Indicators'));
const Color = lazy(() => import('./Color'));

function TopBanner() {
    const data = useSelector((state) => state.indicators);
    const hide500 = useMediaQuery('(max-width:600px)');

    const { darkMode } = useSelector((state) => state.settings);
    const wallet = useSelector((state) => state.wallet);
    const wallets = JSON.parse(localStorage.getItem('wallets'));

    const onClick = async () => {
        try {
            await ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: wallet.walletNetwork !== '1' ? '0x1' : '0x89' }],
            });
          } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902 || switchError.code === -32603) {
              try {
                await ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                        chainId: "0x89",
                        rpcUrls: ["https://rpc-mainnet.matic.network/"],
                        chainName: "Matic Mainnet",
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18
                        },
                        blockExplorerUrls: ["https://polygonscan.com/"]
                    },
                  ],
                });
              } catch (addError) {
                // handle "add" error
              }
            }
            // handle other "switch" errors
          }
    }

    return (
        <AppBar position="static" sx={{ justifyContent: 'center', maxHeight: '38px', color: 'black', bgcolor: !darkMode ? "#f6eaf7" : '#B197FF' }}>
            <Toolbar disableGutters>
                {hide500 && <Link component={RouterLink} to="/">
                    <Logo />
                </Link>}
                {!hide500 && <Suspense fallback={<></>}><Indicators data={data} /></Suspense>}
                <Container
                    disableGutters
                    maxWidth="100%"
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    
                    <ConnectWallet wallet={wallet} wallets={wallets}/>
                    <Box 
                        onClick={onClick} 
                        sx={{width: 22, height: 22, borderRadius: '50%', marginLeft: 1, cursor: 'pointer'}}
                        component={'img'} 
                        src={
                            Number(wallet.walletNetwork) === 137 ? "https://cdn-icons-png.flaticon.com/24/7016/7016537.png" : "https://cdn-icons-png.flaticon.com/24/7016/7016523.png" 
                        }
                    />
                    <RefCurrency />
                    {!hide500 && <Suspense fallback={<></>}><Color/></Suspense>}
                    <ToggleMode />
                </Container>
            </Toolbar>
        </AppBar>
    );
}

export default TopBanner;
