import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function Theme() {
    const { darkMode } = useSelector((state) => state.settings);

    let theme = createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#00244F' : '#dcd2fa',
          },
          primary: {
            light: '#a255ff',
            main: darkMode ? '#002F54' : '#651fff',
            dark: '#0100ca',
            contrastText: 'white'
          },
          secondary: {
            light: '#6effff',
            main: '#00e5ff',
            dark: '#00b2cc'
          },
          neutral: {
            main: darkMode ? '#002F54' : '#dcd2fa',
          },
          primaryTextColor:{
            main:'#ffffff'
          },
          secondaryTextColor:{
            main:'#000000'
          },
          custom: {
            main: '#07f3d5',
          },
          contrastThreshold: 3,
          tonalOffset: 0.2,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              contained: {
                backgroundColor: "#651fff",
                '&:hover': {
                  backgroundColor: '#a255ff',
                },
                '&:active': {
                  backgroundColor: '#651fff',
                },
                '&:focus': {
                  boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                },
              }
            }
          },
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                scrollbarColor: darkMode ? '#002F54' : '#651fff',
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                  backgroundColor: darkMode ? '#00244F' : '#EEEEEE',
                  width: '8px',
                  borderRadius: 8,
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                  backgroundColor: '#00b2cc',
                  minHeight: 20,
                  borderRadius: 4,
                },
                "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
                  backgroundColor: '#651fff',
                },
                "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
                  backgroundColor: "#959595",
                },
                "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: '#651fff',
                },
                "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
                  backgroundColor: '#651fff',
                },
              },
            },
          },
        },
      });

      theme = responsiveFontSizes(theme);

      return theme
}