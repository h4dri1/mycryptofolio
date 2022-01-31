export const TOGGLE_CREATE_WALLET_MODAL = 'TOGGLE_CREATE_WALLET_MODAL';
export const UPDATE_CREATE_WALLET_INPUT = 'UPDATE_CREATE_WALLET_INPUT';
export const CREATE_NEW_WALLET = 'CREATE_NEW_WALLET';
export const UPDATE_SELECTED_WALLET = 'UPDATE_SELECTED_WALLET';
// get portfolion data
export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
export const FETCH_SPECIFIC_PORTFOLIO = 'FETCH_SPECIFIC_PORTFOLIO';
export const FETCH_SPECIFIC_PORTFOLIO_SUCCESS = 'FETCH_SPECIFIC_PORTFOLIO_SUCCESS';
// export const GET_ASSETS = 'GET_ASSETS';

export const toggleCreateWalletModal = () => ({
  type: TOGGLE_CREATE_WALLET_MODAL,
});

export const updateCreateWalletInput = (payload) => ({
  type: UPDATE_CREATE_WALLET_INPUT,
  payload,
});

export const createNewWallet = () => ({
  type: CREATE_NEW_WALLET,
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

// export const getAssets = () => ({
//   type: GET_ASSETS,
// })
