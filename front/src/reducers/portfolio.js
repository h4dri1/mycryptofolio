import {
  TOGGLE_CREATE_WALLET_MODAL, UPDATE_CREATE_WALLET_INPUT,
  UPDATE_SELECTED_WALLET, FETCH_PORTFOLIO_SUCCESS, FETCH_SPECIFIC_WALLET_SUCCESS,
  UPDATE_WALLET_LIST, DELETE_OR_UPDATE_WALLET_SUCCESS, TOGGLE_UPDATE_WALLET_MODAL,
  UPDATE_UPDATE_WALLET_INPUT, UPDATE_SELECTED_TRANSACTION,
} from 'src/actions/portfolio';

const initialState = {
  createWallet: {
    toggle: false,
    inputText: '',
  },
  editWallet: {
    toggle: false,
    inputText: '',
  },
  selectedWallet: '',
  selectedTransaction: '',
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
    case TOGGLE_UPDATE_WALLET_MODAL:
      return {
        ...state,
        editWallet: {
          ...state.editWallet,
          toggle: !state.editWallet.toggle,
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
    case UPDATE_UPDATE_WALLET_INPUT:
      return {
        ...state,
        editWallet: {
          ...state.editWallet,
          inputText: action.payload,
        },
      };
    case UPDATE_WALLET_LIST:
      return {
        ...state,
        wallet: [...state.wallet, action.payload],
      };
    case DELETE_OR_UPDATE_WALLET_SUCCESS:
      return {
        ...state,
        wallet: action.payload,
      };
    case UPDATE_SELECTED_WALLET:
      return {
        ...state,
        selectedWallet: action.payload ? action.payload : '',
      };
    case UPDATE_SELECTED_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.payload ? action.payload : '',
      };
    case FETCH_PORTFOLIO_SUCCESS:
      return {
        ...state,
        distribution: action.payload.distribution,
        performance: action.payload.performance,
        transactions: action.payload.transactions,
        wallet: action.payload.wallet,
      };
    case FETCH_SPECIFIC_WALLET_SUCCESS:
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
