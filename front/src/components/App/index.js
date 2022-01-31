// == Import
import Home from 'src/pages/Home';
import Portfolio from 'src/pages/Portfolio';
import CryptoPage from 'src/pages/CryptoPage';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getAllCryptos } from 'src/actions/cryptos';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper } from '@mui/material';

// == Composant

const App = () => {

  // DARK MODE
  const { darkMode } = useSelector((state) => state.settings)

  // COLOR PALETTE for LIGHT & DARK modes
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCryptos());
  }, []);


  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Paper>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crypto-details/:slug" element={<CryptoPage />} />
            <Route path="/portfolio" element={<Portfolio />}>
              <Route path="/portfolio/:portfolioName" element={<Portfolio />} />
            </Route>
          </Routes>
        </Paper>
      </ThemeProvider>
    </div>
  );
};

// == Export
export default App;
