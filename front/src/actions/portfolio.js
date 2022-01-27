export const TOGGLE_CREATE_PORTFOLIO_MODAL = 'TOGGLE_CREATE_PORTFOLIO_MODAL';
export const UPDATE_CREATE_PORTFOLIO_INPUT = 'UPDATE_CREATE_PORTFOLIO_INPUT';
export const CREATE_NEW_PORTFOLIO = 'CREATE_NEW_PORTFOLIO';
export const UPDATE_SELECTED_PORTFOLIO = 'UPDATE_SELECTED_PORTFOLIO';
// get portfolion data
export const FETCH_PORTFOLIO = 'FETCH_PORTFOLIO';
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS';

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
