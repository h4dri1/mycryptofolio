import { INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions';

const initialState = {
  name: 'The Counter',
  value: 0,
};

const counter = (state = initialState, action = {}) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        value: state.value + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        value: state.value - 1,
      };
    default:
      return state;
  }
};

export default counter;
