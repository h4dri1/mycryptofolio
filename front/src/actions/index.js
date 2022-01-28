export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const toggleLoginModal = () => ({
  type: TOGGLE_LOGIN_MODAL,
});

export const login = () => ({
  type: LOGIN,
});

export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE,
});
