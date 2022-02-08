// == Import
import Home from 'src/pages/Home';
import Portfolio from 'src/pages/Portfolio';
import CryptoPage from 'src/pages/CryptoPage';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

import AlertMsg from 'src/components/common/AlertMessage';

import { checkToken } from 'src/actions/user';
import { getAllCryptos } from 'src/actions/cryptos';

// == Composant

const App = () => {
  const dispatch = useDispatch();
  // DARK MODE
  const { darkMode } = useSelector((state) => state.settings);

  // COLOR PALETTE for LIGHT & DARK modes
  let theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        light: '#7f5cce',
        main: '#3A0CA3',
        dark: '#280872',
        contrastText: 'white',
      },
      secondary: {
        light: '#c345b1',
        main: '#B5179E',
        dark: '#7e106e',
      },
      neutral: {
        main: '#a9b0ba',
      },
    },
  })

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
          <Route path="/login" element={<Home displayLogin />} />
          <Route path="/crypto/:slug" element={<CryptoPage />} />
          <Route path="/portfolio" element={<Portfolio />}>
            <Route path="/portfolio/:walletName" element={<Portfolio />} />
          </Route>
        </Routes>
        {/* </Paper> */}
      </ThemeProvider>
    </div>
  );
};

// == Export
export default App;
