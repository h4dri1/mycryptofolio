import {
  CHANGE_FIELD
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
      console.log('Dans le case', action.type)
      return ({
        ...state,
        [action.payload.key]: action.payload.value 
      });
    }
  
    default:
      return state;
  }
}

export default reducer;
