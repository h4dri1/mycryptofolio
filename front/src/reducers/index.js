import { combineReducers } from 'redux';
import userReducer from './user';
import cryptosReducer from './cryptos';
import portfolioReducer from './portfolio';
import settingsReducer from './settings';
import cryptoDetailsReducer from './cryptoDetails';

export default combineReducers({
  user: userReducer,
  cryptos: cryptosReducer,
  portfolio: portfolioReducer,
  settings: settingsReducer,
  cryptoDetails: cryptoDetailsReducer,
});
