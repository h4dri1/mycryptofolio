// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import rootReducer from 'src/reducers';
import auth from '../middleware/auth';
import cryptoList from '../middleware/cryptoList';
import portfolio from '../middleware/portfolio';
import cryptoDetails from '../middleware/cryptoDetails';
import indicators from '../middleware/indicators';
import profil from '../middleware/profil';
import nftList from '../middleware/nftList';
import nftDetails from '../middleware/nftDetails';
import metamask from '../middleware/metamask';
import wallet from '../middleware/wallet';
import favorite from '../middleware/favorite';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    auth,
    cryptoList,
    portfolio,
    cryptoDetails,
    indicators,
    profil,
    nftList,
    nftDetails,
    metamask,
    wallet,
    favorite,
  ),
);

// == Store
const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

// == Export
export default store;
