/* eslint-disable react/function-component-definition */
// == Import
import Home from 'src/pages/Home';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import Loading from '/src/components/Loading';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AlertMsg from 'src/components/common/AlertMessage';
import { checkToken } from 'src/actions/user';
import { getCurrentAccount } from 'src/actions/metamask';

const CryptoPage = lazy(() => import('../../pages/CryptoPage'));
const Wallet = lazy(() => import('../../pages/Wallet'));
const Portfolio = lazy(() => import('../../pages/Portfolio'));
const NFTDetails = lazy(() => import('../../pages/NFTDetails'));
const NFTPage = lazy(() => import('../../pages/NFTPage'));
const MarketPage = lazy(() => import('../../pages/MarketPage'));
const ContactPage = lazy(() => import('../../pages/ContactPage'));
const ForgotPass = lazy(() => import('../../pages/ForgotPass'));
const ProfilPage = lazy(() => import('../../pages/ProfilPage'));
const UnknowRoute = lazy(() => import('../../pages/404'));

import Theme from '../../theming/Theme';

// == Composant

const App = () => {
  const dispatch = useDispatch();
  // DARK MODE
  const { logged } = useSelector((state) => state.user);
  const { walletAddress } = useSelector((state) => state.wallet);
  const theme = Theme()
  // COLOR PALETTE for LIGHT & DARK modes
  
  const changeAccount = (accounts, change) => {
    dispatch(getCurrentAccount(accounts, change));
  }

  const changeNetwork = () => {
    dispatch(getCurrentAccount());
  }

  console.log(window.devicePixelRatio)

  useEffect(() => {
    async function asyncCheck() {
      if (localStorage.getItem('refreshToken')) {
        await dispatch(checkToken());
      }
      if (walletAddress !== 'Wallet') {
        ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length > 0) {
            const change = true
            changeAccount(accounts, change)
          }
        });
        ethereum.on('chainChanged', (networkId) => {
          if (networkId.length > 0) {
            changeNetwork(networkId)
          }
        });
      }
    }
    asyncCheck();
  }, []);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {/* <Paper> */}
        <CssBaseline />
        <AlertMsg />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Home displayLogin />} />
            <Route path="/market" element={
              <Suspense fallback={<Loading/>}>
                <MarketPage />
              </Suspense>
              } 
            />
            <Route path="/nft" element={
              <Suspense fallback={<Loading/>}>
                <NFTPage />
              </Suspense>
            } />
            <Route path="/crypto/:slug" element={
              <Suspense fallback={<Loading/>}>
                <CryptoPage />
              </Suspense>
              }
            />
            <Route path="/nft/:slug" element={
              <Suspense fallback={<Loading/>}>
                <NFTDetails />
              </Suspense>
              }
            />
            <Route path="/wallet" element={
              <Suspense fallback={<Loading/>}>
                <Wallet />
              </Suspense>
              }
            />
            <Route path="/portfolio" element={
              <Suspense fallback={<Loading/>}>
                <Portfolio />
              </Suspense>  
            }>
              <Route path="/portfolio/:walletName" element={
                <Suspense fallback={<Loading/>}>
                  <Portfolio />
                </Suspense>
              } />
            </Route>
            <Route path="/contact" element={
              <Suspense fallback={<Loading/>}>
                <ContactPage />
              </Suspense>
            } />
            <Route path="/profil" element={
              <Suspense fallback={<Loading/>}>
                <ProfilPage />
              </Suspense>
            } />
            <Route path="/reset/:token" element={
              <Suspense fallback={<Loading/>}>
                <ForgotPass />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<Loading/>}>
                <UnknowRoute />
              </Suspense>
            } />
        </Routes>
        {/* </Paper> */}
      </ThemeProvider>
    </div>
  );
};

// == Export
export default App;
