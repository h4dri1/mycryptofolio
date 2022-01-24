// == Import : npm
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
// import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
// import theme from 'src/themes/darkTheme';
import { BrowserRouter } from 'react-router-dom';


// == Import : local
// Composants
import App from 'src/components/App';
import store from './store';

// == Render
// 1. Élément React racine (celui qui contient l'ensemble de l'app)
//    => crée une structure d'objets imbriqués (DOM virtuel)
const rootReactElement = (
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* <ThemeProvider theme={theme}> */}
        <CssBaseline />
        <App />
        {/* </ThemeProvider> */}
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
// 2. La cible du DOM (là où la structure doit prendre vie dans le DOM)
const target = document.getElementById('root');
// 3. Déclenchement du rendu de React (virtuel) => DOM (page web)
render(rootReactElement, target);
