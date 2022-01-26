export const GET_TRANSACTIONS_HIST = 'GET_TRANSACTIONS_HIST';
export const UPDATE_TRANSACTIONS_HIST = 'UPDATE_TRANSACTIONS_HIST';
export const TOGGLE_CREATE_PORTFOLIO_MODAL = 'TOGGLE_CREATE_PORTFOLIO_MODAL';
export const UPDATE_CREATE_PORTFOLIO_INPUT = 'UPDATE_CREATE_PORTFOLIO_INPUT';
export const CREATE_NEW_PORTFOLIO = 'CREATE_NEW_PORTFOLIO';
export const UPDATE_SELECTED_PORTFOLIO = 'UPDATE_SELECTED_PORTFOLIO';

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
