import { combineReducers } from 'redux';
import { TOGGLE_LOGIN_MODAL } from '../actions';
import userReducer from './user';


export const initialState = {
  loginIsOpen: false,
};

const mainReducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case TOGGLE_LOGIN_MODAL: {
      return ({
        ...state,
        loginIsOpen: !state.loginIsOpen
      });
    }
  
    default:
      return state;
  }
}


export default combineReducers({
  main: mainReducer,
  user: userReducer,
});
