export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_DISPLAY_SNACK_BAR = 'SET_DISPLAY_SNACK_BAR';

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
