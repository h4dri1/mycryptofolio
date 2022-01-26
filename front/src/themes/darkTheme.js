import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h2: {
      fontSize: 15,
    }
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#3A0CA3",
      dark: "#3F37C9",
    },
    secondary: {
      main: orange[600],
    },
  },
});

export default theme;


