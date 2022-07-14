import {
  TOGGLE_DARK_MODE,
  TOGGLE_LOGIN_MODAL,
  SET_DISPLAY_SNACK_BAR,
  TOGGLE_CONFIRM_DELETE,
  TOGGLE_TRANSACTION_EDITOR,
  SET_PENDING,
  CHANGE_COLOR,
  SET_HOME_ICON
} from 'src/actions/settings';

if (localStorage.getItem('darkMode')) {
  const darkString = localStorage.getItem('darkMode');
  var dark = (darkString === 'true');
} else {
  var dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const initialState = {
  homeIcon: true,
  colorTheme: 'original',
  darkMode: dark,
  loginIsOpen: false,
  deleteItem: {
    toggle: false,
    type: '',
    itemId: null,
  },
  alert: {
    open: false,
    severity: 'success',
    message: '',
  },
  transactionEditorIsOpen: false,
  pending: false,
};

const settings = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_COLOR: {
      return {
        ...state,
        colorTheme: action.payload,
      };
    }
  
    case TOGGLE_DARK_MODE: {
      localStorage.setItem('darkMode', !state.darkMode);
      return ({
        ...state,
        darkMode: !state.darkMode,
      });
    }

    case SET_HOME_ICON: {
      return {
        ...state,
        homeIcon: action.payload,
      };
    }

    case SET_PENDING: {
      return ({
        ...state,
        pending: !state.pending,
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

    case TOGGLE_CONFIRM_DELETE:
      return {
        ...state,
        deleteItem: {
          toggle: !state.deleteItem.toggle,
          type: action.payload ? action.payload.type : '',
          itemId: action.payload ? action.payload.itemId : null,
        },
      };

    case TOGGLE_TRANSACTION_EDITOR: {
      return ({
        ...state,
        transactionEditorIsOpen: !state.transactionEditorIsOpen,
      });
    }

    default:
      return state;
  }
};

export default settings;
