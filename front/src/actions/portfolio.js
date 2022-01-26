export const GET_TRANSACTIONS_HIST = 'GET_TRANSACTIONS_HIST';
export const UPDATE_TRANSACTIONS_HIST = 'UPDATE_TRANSACTIONS_HIST';
export const TOGGLE_CREATE_PORTFOLIO_MODAL = 'TOGGLE_CREATE_PORTFOLIO_MODAL';

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
