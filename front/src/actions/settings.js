export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_DISPLAY_SNACK_BAR = 'SET_DISPLAY_SNACK_BAR';
export const TOGGLE_CONFIRM_DELETE = 'TOGGLE_CONFIRM_DELETE';
export const TOGGLE_TRANSACTION_EDITOR = 'TOGGLE_TRANSACTION_EDITOR';

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});

export const setDisplaySnackBar = (payload) => ({
  type: SET_DISPLAY_SNACK_BAR,
  payload,
});

export const toggleConfirmDelete = (payload) => ({
  type: TOGGLE_CONFIRM_DELETE,
  payload,
});

export const toggleTransactionEditor = () => ({
  type: TOGGLE_TRANSACTION_EDITOR,
});
