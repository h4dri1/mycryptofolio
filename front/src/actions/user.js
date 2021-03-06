export const CHANGE_FIELD = 'CHANGE_FIELD';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';
export const LOGOUT = 'LOGOUT';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const SAVE_NEW_TOKEN = 'SAVE_NEW_TOKEN';
export const EXISTING_USER_TOGGLE = 'EXISTING_USER_TOGGLE';
export const REGISTER = 'REGISTER';
export const CHANGE_USER = 'CHANGE_USER';
export const CHANGE_AVATAR = 'CHANGE_AVATAR';
export const DELETE_USER = 'DELETE_USER';
export const CHANGE_FORGOT_PASSWORD = 'CHANGE_FORGOT_PASSWORD';

export const changeField = (key, value) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value,
  },
});

export const deleteUser = () => ({
  type: DELETE_USER,
});

export const change_user = (user) => ({
  type: CHANGE_USER,
  payload: { ...user },
});

export const change_avatar = (avatar) => ({
  type: CHANGE_AVATAR,
  payload: { ...avatar },
});

export const change_password = (newPass) => ({
  type: CHANGE_PASSWORD,
  payload: { ...newPass },
});

export const change_forgot_password = (newPass) => ({
  type: CHANGE_FORGOT_PASSWORD,
  payload: { ...newPass },
});

export const login = () => ({
  type: LOGIN,
});

export const saveUser = (newUser) => ({
  type: SAVE_USER,
  payload: { ...newUser },
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
