import { UPDATE_TRANSACTIONS_HIST, TOGGLE_CREATE_PORTFOLIO_MODAL } from 'src/actions/portfolio';

const initialState = {
  createPortfolioToggle: false,
  transactionsList: [],
};

const portfolioReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_TRANSACTIONS_HIST:
      return {
        ...state,
        transactionsList: action.payload,
      };
    case TOGGLE_CREATE_PORTFOLIO_MODAL:
      return {
        ...state,
        createPortfolioToggle: !state.createPortfolioToggle,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
