export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_DISPLAY_SNACK_BAR = 'SET_DISPLAY_SNACK_BAR';
export const TOGGLE_CONFIRM_DELETE = 'TOGGLE_CONFIRM_DELETE';
export const TOGGLE_TRANSACTION_EDITOR = 'TOGGLE_TRANSACTION_EDITOR';
export const CHANGE_COLOR = 'CHANGE_COLOR';
export const SET_HOME_ICON = 'SET_HOME_ICON';

export const changeColor = (payload) => ({
  type: CHANGE_COLOR,
  payload,
})

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const setHomeIcon = (payload) => ({
  type: SET_HOME_ICON,
  payload,
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