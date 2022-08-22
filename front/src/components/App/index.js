/* eslint-disable react/function-component-definition */
// == Import
//import Home from 'src/pages/Home';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

import Loading from '/src/components/Loading';

const Home = lazy(() => import('src/pages/Home'));
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

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import AlertMsg from 'src/components/common/AlertMessage';

import { useNavigate } from 'react-router-dom';

import { checkToken } from 'src/actions/user';

import { getWalletBalance, updateWalletAddress, getWalletHistory } from '../../actions/connectWallet';

// == Composant

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // DARK MODE
  const { darkMode } = useSelector((state) => state.settings);
  const { logged } = useSelector((state) => state.user);
  const { walletAddress } = useSelector((state) => state.connectWallet)

  // COLOR PALETTE for LIGHT & DARK modes
  let theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#00244F' : 'white',
      },
      primary: {
        light: '#7f5cce',
        main: '#3A0CA3',
        dark: '#280872',
        contrastText: 'white'
      },
      secondary: {
        light: '#c345b1',
        main: '#B5179E',
        dark: '#7e106e'
      },
      neutral: {
        main: '#a9b0ba',
      },
      custom: {
        main: '#07f3d5',
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });

  theme = responsiveFontSizes(theme);

  const changeDispatch = () => {
    dispatch(getWalletBalance());
    dispatch(getWalletHistory());
  }

  const getChangeWallet = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          console.log("accountsChanged", accounts);
          dispatch(updateWalletAddress(accounts[0]));
          changeDispatch();
        } else {
          localStorage.setItem('wallet', 'Wallet');
          dispatch(updateWalletAddress('Wallet'));
          navigate('/');
        }
      });
    }
  }

  const getChangeNetwork = () => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (networkId) => {
        if (networkId.length > 0) {
          console.log("network change", networkId);
          changeDispatch();
        } else {
          localStorage.setItem('wallet', 'Wallet');
          dispatch(updateWalletAddress('Wallet'));
          navigate('/');
        }
      });
    }
  }

  useEffect(async () => {
    if (logged) {
      await dispatch(checkToken());
    }
    if (walletAddress !== 'Wallet') {
      getChangeWallet();
      getChangeNetwork();
    }
  }, []);


  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {/* <Paper> */}
        <CssBaseline />
        <AlertMsg />
        <Routes>
            <Route path="/" element={
              <Suspense fallback={<Loading/>}>
                <Home />
              </Suspense>
            } />
            <Route path="/login" element={
              <Suspense fallback={<Loading/>}>
                <Home displayLogin />
              </Suspense>
            } />
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
