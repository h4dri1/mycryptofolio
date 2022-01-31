export const GET_TRANSACTIONS_HIST = 'GET_TRANSACTIONS_HIST';
export const UPDATE_TRANSACTIONS_HIST = 'UPDATE_TRANSACTIONS_HIST';
export const TOGGLE_CREATE_PORTFOLIO_MODAL = 'TOGGLE_CREATE_PORTFOLIO_MODAL';
export const UPDATE_CREATE_PORTFOLIO_INPUT = 'UPDATE_CREATE_PORTFOLIO_INPUT';
export const CREATE_NEW_PORTFOLIO = 'CREATE_NEW_PORTFOLIO';
export const UPDATE_SELECTED_PORTFOLIO = 'UPDATE_SELECTED_PORTFOLIO';
// get portfolio data
export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';
// export const GET_ASSETS = 'GET_ASSETS';


export const getTransactionsHist = () => ({
  type: GET_TRANSACTIONS_HIST,
});

export const updateTransactionsHist = (payload) => ({
  type: UPDATE_TRANSACTIONS_HIST,
  payload,
});

export const toggleCreatePortfolioModal = () => ({
  type: TOGGLE_CREATE_PORTFOLIO_MODAL,
});

export const updateCreatePortfolioInput = (payload) => ({
  type: UPDATE_CREATE_PORTFOLIO_INPUT,
  payload,
});

export const createNewPortfolio = () => ({
  type: CREATE_NEW_PORTFOLIO,
});

export const updateSelectedPortfolio = (payload) => ({
  type: UPDATE_SELECTED_PORTFOLIO,
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
// export const getAssets = () => ({
//   type: GET_ASSETS,
// }) 
