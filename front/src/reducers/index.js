import { combineReducers } from 'redux';
import userReducer from './user';
import cryptos from './cryptos';


export default combineReducers({
  user: userReducer,
  cryptos,
});
