import {
  TOGGLE_CREATE_WALLET_MODAL, UPDATE_CREATE_WALLET_INPUT,
  UPDATE_SELECTED_WALLET, FETCH_PORTFOLIO_SUCCESS,
} from 'src/actions/portfolio';

const initialState = {
  createWallet: {
    toggle: false,
    inputText: '',
  },
  selectedWallet: '',
  transactionsList: [],
  distribution: [],
  performance: [],
  transactions: [],
  wallet: [],
};

const portfolioReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_CREATE_WALLET_MODAL:
      return {
        ...state,
        createWallet: {
          inputText: '',
          toggle: !state.createWallet.toggle,
        },
      };
    case UPDATE_CREATE_WALLET_INPUT:
      return {
        ...state,
        createWallet: {
          ...state.createWallet,
          inputText: action.payload,
        },
      };
    case UPDATE_SELECTED_WALLET:
      return {
        ...state,
        selectedWallet: action.payload ? action.payload : '',
      };
    case FETCH_PORTFOLIO_SUCCESS:
      return {
        ...state,
        distribution: action.payload.distribution,
        performance: action.payload.performance,
        transactions: action.payload.transactions,
        wallet: action.payload.wallet,
      };
    default:
      return state;
  }
};

export default portfolioReducer;
