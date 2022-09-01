import { createTheme, ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function Theme() {
    const { darkMode } = useSelector((state) => state.settings);

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

      return theme
}