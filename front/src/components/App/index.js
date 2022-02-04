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
        light: '#aa90d7',
        main: '#3A0CA3',
        dark: '#280872',
        contrastText: 'white',
      },
      secondary: {
        light: '#fafafa',
        main: '#B5179E',
        dark: '#7e106e',
        contrastText: 'white',
      },
      neutral: {
        main: '#a9b0ba',
        contrastText: 'white',
      },


      // contrastThreshold: 3,
      // // Used by the functions below to shift a color's luminance by approximately
      // // two indexes within its tonal palette.
      // // E.g., shift from Red 500 to Red 300 or Red 700.
      // tonalOffset: 0.2,
    },

  });

  // theme = responsiveFontSizes(theme, { breakpoints: ['sm', 'md', 'lg'] });

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
