import { UPDATE_TRANSACTIONS_HIST } from 'src/actions/portfolio';

const initialState = {
  transactionsList: [],
};

const portfolioReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_TRANSACTIONS_HIST:
      return {
        ...state,
        transactionsList: action.payload,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
