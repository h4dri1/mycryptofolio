export const CHANGE_FIELD = 'CHANGE_FIELD';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const LOGOUT = 'LOGOUT';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const SAVE_NEW_TOKEN = 'SAVE_NEW_TOKEN';
export const EXISTING_USER_TOGGLE = 'EXISTING_USER_TOGGLE';
export const REGISTER = 'REGISTER';

export const changeField = (key, value) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value,
  },
});

export const login = () => ({
  type: LOGIN,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: { ...user },
});

export const logout = () => ({
  type: LOGOUT,
});

export const checkToken = () => ({
  type: CHECK_TOKEN,
});

export const saveNewToken = (payload) => ({
  type: SAVE_NEW_TOKEN,
  payload,
});

export const existingUserToggle = () => ({
  type: EXISTING_USER_TOGGLE,
});

export const register = () => ({
  type: REGISTER,
});
