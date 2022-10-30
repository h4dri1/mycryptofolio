import {
  FETCH_CRYPTO_DATA, UPDATE_CRYPTO_DATA, FETCH_CHART_DATA,
} from 'src/actions/cryptoDetails';

const initialState = {
  days: 1,
  data: {
    name: '',
  },
  chart: {
    prices: [],
    market_caps: [],
    total_volumes: [],
  },
};

const cryptoDetailsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_CRYPTO_DATA: {
      return {
        ...state,
        data: {
          name: '',
        },
        chart: {
          prices: [],
          market_caps: [],
          total_volumes: [],
        },
        days: action.days,
      };
    }
    case FETCH_CHART_DATA: {
      return {
        ...state,
        chart: {
          prices: [],
          market_caps: [],
          total_volumes: [],
        },
        days: action.days,
      };
    }
    case UPDATE_CRYPTO_DATA:
      return {
        ...state,
        data: action.payload.data,
        chart: action.payload.chart,
      };
    default:
      return state;
  }
};

export default cryptoDetailsReducer;
