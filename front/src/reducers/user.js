import {
  CHANGE_FIELD,
  LOGIN,
} from '../actions/user'

export const initialState = {
  logged: false,
  email: '',
  password: '',
  pseudo: 'Toto'
}

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {

    case CHANGE_FIELD: {
      return ({
        ...state,
        [action.payload.key]: action.payload.value 
      });
    }

    case LOGIN: {
      return ({
        ...state,
        password: ''
      })
    }
  
    default:
      return state;
  }
}

export default reducer;
