export const CHANGE_FIELD = 'CHANGE_FIELD';
export const LOGIN = 'LOGIN';
export const SAVE_USER = 'SAVE_USER';

export const changeField = (key, value) => ({
  type: CHANGE_FIELD,
  payload: {
    key,
    value,
  }
})

export const login = () => ({
  type: LOGIN,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: { ...user }
})

