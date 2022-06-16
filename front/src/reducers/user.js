import {
  CHANGE_FIELD,
  CHANGE_USER,
  CHANGE_PASSWORD,
  LOGIN,
  SAVE_USER,
  LOGOUT,
  SAVE_NEW_TOKEN,
  EXISTING_USER_TOGGLE,
  CHANGE_AVATAR,
  CHANGE_CURRENCY,
  DELETE_USER,
} from '../actions/user';

export const initialState = {
  logged: false,
  existingUser: true,
  id: '',
  email: '',
  password: '',
  nickname: '',
  passwordCheck: '',
  avatar: '',
  accessToken: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_FIELD: {
      return ({
        ...state,
        [action.payload.key]: action.payload.value,
      });
    }
    case CHANGE_AVATAR: {
      return ({
        ...state,
        ...action.payload,
      });
    }
    case CHANGE_USER: {
      return ({
        ...state,
        ...action.payload,
      });
    }
    case CHANGE_PASSWORD: {
      return ({
        ...state,
        password: '',
        passwordCheck: ''
      });
    }
    case CHANGE_CURRENCY: {
      return ({
        ...state,
        ...action.payload,
      });
    }
    case LOGIN: {
      return ({
        ...state,
        password: '',
      });
    }

    case SAVE_USER: {
      return ({
        ...state,
        ...action.payload,
        logged: true,
      });
    }

    case LOGOUT: {
      return ({
        ...state,
        logged: false,
        email: '',
        nickname: '',
        avatar: '',
        accessToken: '',
      });
    }

    case DELETE_USER: {
      return ({
        ...state,
        logged: false,
        email: '',
        nickname: '',
        avatar: '',
        accessToken: '',
      });
    }

    case SAVE_NEW_TOKEN: {
      return ({
        ...state,
        accessToken: action.payload,
      });
    }

    case EXISTING_USER_TOGGLE: {
      return ({
        ...state,
        existingUser: !state.existingUser,
      });
    }
    default:
      return state;
  }
};

export default reducer;
