import { combineReducers } from 'redux';
import { TOGGLE_LOGIN_MODAL, SAVE_USER } from '../actions';
import userReducer from './user';
import cryptosReducer from './cryptos';
import portfolioReducer from './portfolio';
import settingsReducer from './settings';

export const initialState = {
  loginIsOpen: false,
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_LOGIN_MODAL: {
      return ({
        ...state,
        loginIsOpen: !state.loginIsOpen,
      });
    }

    default:
      return state;
  }
};

export default combineReducers({
  main: mainReducer,
  user: userReducer,
  cryptos: cryptosReducer,
  portfolio: portfolioReducer,
  settings: settingsReducer,
});
