import {
  TOGGLE_DARK_MODE,
  TOGGLE_LOGIN_MODAL,
  SET_DISPLAY_SNACK_BAR,
  TOGGLE_CONFIRM_DELETE,
  TOGGLE_TRANSACTION_EDITOR,
} from 'src/actions/settings';

export const initialState = {
  darkMode: false,
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
