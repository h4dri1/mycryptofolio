export const TOGGLE_CREATE_WALLET_MODAL = 'TOGGLE_CREATE_WALLET_MODAL';
export const TOGGLE_UPDATE_WALLET_MODAL = 'TOGGLE_UPDATE_WALLET_MODAL';
export const UPDATE_CREATE_WALLET_INPUT = 'UPDATE_CREATE_WALLET_INPUT';
export const UPDATE_UPDATE_WALLET_INPUT = 'UPDATE_UPDATE_WALLET_INPUT';
export const CREATE_NEW_WALLET = 'CREATE_NEW_WALLET';
export const UPDATE_WALLET_LIST = 'UPDATE_WALLET_LIST';
export const UPDATE_WALLET = 'UPDATE_WALLET';
export const DELETE_WALLET = 'DELETE_WALLET';
export const DELETE_OR_UPDATE_WALLET_SUCCESS = 'DELETE_OR_UPDATE_WALLET_SUCCESS';
export const UPDATE_SELECTED_WALLET = 'UPDATE_SELECTED_WALLET';
// get portfolio data
export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
export const FETCH_SPECIFIC_PORTFOLIO = 'FETCH_SPECIFIC_PORTFOLIO';
export const FETCH_SPECIFIC_PORTFOLIO_SUCCESS = 'FETCH_SPECIFIC_PORTFOLIO_SUCCESS';
export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

export const toggleCreateWalletModal = () => ({
  type: TOGGLE_CREATE_WALLET_MODAL,
});

export const toggleUpdateWalletModal = () => ({
  type: TOGGLE_UPDATE_WALLET_MODAL,
});

export const updateCreateWalletInput = (payload) => ({
  type: UPDATE_CREATE_WALLET_INPUT,
  payload,
});

export const updateUpdateWalletInput = (payload) => ({
  type: UPDATE_UPDATE_WALLET_INPUT,
  payload,
});

export const createNewWallet = () => ({
  type: CREATE_NEW_WALLET,
});

export const updateWallet = (payload) => ({
  type: UPDATE_WALLET,
  payload,
});

export const deleteWallet = (payload) => ({
  type: DELETE_WALLET,
  payload,
});

export const deleteOrUpdateWalletSuccess = (payload) => ({
  type: DELETE_OR_UPDATE_WALLET_SUCCESS,
  payload,
});

export const updateWalletList = (payload) => ({
  type: UPDATE_WALLET_LIST,
  payload,
});

export const updateSelectedWallet = (payload) => ({
  type: UPDATE_SELECTED_WALLET,
  payload,
});

export const fetchPortfolio = (payload) => ({
  type: FETCH_PORTFOLIO,
  payload,
});

export const fetchPortfolioSuccess = (payload) => ({
  type: FETCH_PORTFOLIO_SUCCESS,
  payload,
});

export const fetchSpecificPortfolio = (payload) => ({
  type: FETCH_SPECIFIC_PORTFOLIO,
  payload,
});

export const fetchSpecificPortfolioSuccess = (payload) => ({
  type: FETCH_SPECIFIC_PORTFOLIO_SUCCESS,
  payload,
});

export const saveTransaction = (payload) => ({
  type: SAVE_TRANSACTION,
  payload,
});

export const deleteTransaction = (payload) => ({
  type: DELETE_TRANSACTION,
  payload,
});
