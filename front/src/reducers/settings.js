import {
  TOGGLE_DARK_MODE,
  TOGGLE_LOGIN_MODAL,
} from 'src/actions/settings';

export const initialState = {
  darkMode: false,
  loginIsOpen: false,
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE: {
      return ({
        ...state,
        darkMode: !state.darkMode,
      });
    }

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

export default settings;
