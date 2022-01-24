import { combineReducers } from 'redux';
import { TOGGLE_LOGIN_MODAL, SAVE_USER } from '../actions';
import userReducer from './user';
import cryptosReducer from './cryptos';
import portfolioReducer from './portfolio';

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

    case SAVE_USER: {
      return {
        ...state,
        user: action.payload.pseudo,
      };
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
});
