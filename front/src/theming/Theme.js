import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function Theme() {
    const { darkMode } = useSelector((state) => state.settings);

    let theme = createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#00244F' : '#EEEEEE',
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
            main: darkMode ? '#002F54' : '#EEEEEE',
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
      });

      theme = responsiveFontSizes(theme);

      return theme
}