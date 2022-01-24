import {
  CHANGE_FIELD,
  LOGIN,
  SAVE_USER,
  LOGOUT,
} from '../actions/user';

export const initialState = {
  logged: false,
  email: 'test@test.fr',
  password: '#0clock$0087',
  nickname: '',
  avatar: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_FIELD: {
      return ({
        ...state,
        [action.payload.key]: action.payload.value,
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
      });
    }

    default:
      return state;
  }
};

export default reducer;
