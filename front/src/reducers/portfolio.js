import {
  UPDATE_TRANSACTIONS_HIST, TOGGLE_CREATE_PORTFOLIO_MODAL, UPDATE_CREATE_PORTFOLIO_INPUT,
  UPDATE_SELECTED_PORTFOLIO,
} from 'src/actions/portfolio';

const initialState = {
  createPortfolio: {
    toggle: false,
    inputText: '',
  },
  selectedPortfolio: '',
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
        createPortfolio: {
          inputText: '',
          toggle: !state.createPortfolio.toggle,
        },
      };
    case UPDATE_CREATE_PORTFOLIO_INPUT:
      return {
        ...state,
        createPortfolio: {
          ...state.createPortfolio,
          inputText: action.payload,
        },
      };
    case UPDATE_SELECTED_PORTFOLIO:
      return {
        ...state,
        selectedPortfolio: action.payload ? action.payload : '',
      };
    default:
      return state;
  }
};

export default portfolioReducer;
