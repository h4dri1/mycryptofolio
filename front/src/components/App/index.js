/* eslint-disable react/function-component-definition */
// == Import
import Home from 'src/pages/Home';
import Portfolio from 'src/pages/Portfolio';
import CryptoPage from 'src/pages/CryptoPage';
import UnknowRoute from 'src/pages/404';
import ContactPage from 'src/pages/ContactPage';
import ProfilPage from 'src/pages/ProfilPage';
import ForgotPass from 'src/pages/ForgotPass';
import MarketPage from 'src/pages/MarketPage';
import NFTPage from 'src/pages/NFTPage';
import NFTDetails from 'src/pages/NFTDetails';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { Paper } from '@mui/material';

import AlertMsg from 'src/components/common/AlertMessage';

import { checkToken } from 'src/actions/user';
import { getAllCryptos } from 'src/actions/cryptos';
import { getIndicators } from 'src/actions/indicators';
import { setHomeIcon } from '../../actions/settings';
import { getCryptoList } from '../../actions/cryptos';
import { getWalletAddress } from '../../actions/connectWallet';

// == Composant

const App = () => {
  const dispatch = useDispatch();
  // DARK MODE
  const { darkMode } = useSelector((state) => state.settings);

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

  useEffect(async () => {
    await dispatch(checkToken());
    dispatch(getAllCryptos());
  }, []);


  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {/* <Paper> */}
        <CssBaseline />
        <AlertMsg />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/nft" element={<NFTPage />} />
          <Route path="/login" element={<Home displayLogin />} />
          <Route path="/crypto/:slug" element={<CryptoPage />} />
          <Route path="/nft/:slug" element={<NFTDetails />} />
          <Route path="/portfolio" element={<Portfolio />}>
            <Route path="/portfolio/:walletName" element={<Portfolio />} />
          </Route>
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/reset/:token" element={<ForgotPass />} />
          <Route path="*" element={<UnknowRoute />} />
        </Routes>
        {/* </Paper> */}
      </ThemeProvider>
    </div>
  );
};

// == Export
export default App;
