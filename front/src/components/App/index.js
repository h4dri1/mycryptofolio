// == Import
import Home from 'src/pages/Home';
import Portfolio from 'src/pages/Portfolio';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getAllCryptos } from 'src/actions/cryptos';
import { toggleDarkMode } from 'src/actions';
import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, Paper } from '@mui/material';
// import ThemeProvider from 'src/components/TopBanner/ToggleMode';

// == Composant

const App = () => {

  // // DARK MODE
  const { darkMode } = useSelector((state) => state.settings)

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
        grey: '',
        main: '#B5179E',
        dark: '#7e106e',
        contrastText: 'white',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
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
