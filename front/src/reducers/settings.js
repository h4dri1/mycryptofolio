import {
  TOGGLE_DARK_MODE,
  TOGGLE_LOGIN_MODAL,
  SET_DISPLAY_SNACK_BAR,
} from 'src/actions/settings';

export const initialState = {
  darkMode: false,
  loginIsOpen: false,
  alert: {
    open: false,
    severity: 'success',
    message: '',
  },
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

    case SET_DISPLAY_SNACK_BAR: {
      return ({
        ...state,
        alert: {
          severity: action.payload ? action.payload.severity : state.alert.severity,
          message: action.payload ? action.payload.message : '',
          open: !state.alert.open,
        },
      });
    }
    default:
      return state;
  }
};

export default settings;
