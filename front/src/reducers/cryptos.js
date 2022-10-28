import {
  UPDATE_ALL_CRYPTOS,
  UPDATE_CRYPTO_LIST,
  UPDATE_CRYPTO_TREND,
  UPDATE_CRYPTO_QUANTITY,
  GET_MORE_CRYPTOS_LOADING,
  SET_PRICE,
  UPDATE_CURRENCY,
  UPDATE_NFT_TREND,
  UPDATE_FEAR_GREED_INDEX,
} from 'src/actions/cryptos';

const curr = localStorage.getItem('currency');

if (curr === null || !curr || curr === 'undefined') {
  var currency = 'USD';
}
else {
  var currency = curr;
}

const initialState = {
  allCryptos: [],
  cryptoList: {
    selectedCurrency: currency,
    quantity: 10,
    cryptoListLoading: false,
    list: [],
  },
  cryptoTrend: {
    list: [],
  },
  NFTTrend: {
    list: [],
  },
  FearAndGreed: {
    list: [],
  },
  currentPrice: 0,
};

const cryptosReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_ALL_CRYPTOS:
      return {
        ...state,
        allCryptos: action.payload,
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        cryptoList: {
          ...state.cryptoList,
          selectedCurrency: action.payload,
        },
      };
    case UPDATE_CRYPTO_LIST:
      return {
        ...state,
        cryptoList: {
          ...state.cryptoList,
          list: action.payload,
        },
      };
    case UPDATE_CRYPTO_TREND:
      return {
        ...state,
        cryptoTrend: {
          ...state.cryptoTrend,
          list: action.payload,
        },
      };
    case UPDATE_FEAR_GREED_INDEX:
      return {
        ...state,
        FearAndGreed: {
          ...state.FearAndGreed,
          list: action.payload,
        },
      };
    case UPDATE_NFT_TREND:
      return {
        ...state,
        NFTTrend: {
          ...state.NFTTrend,
          list: action.payload,
        },
      };
    case GET_MORE_CRYPTOS_LOADING:
      return {
        ...state,
        cryptoList: {
          ...state.cryptoList,
          cryptoListLoading: !state.cryptoList.cryptoListLoading,
        },
      };
    case UPDATE_CRYPTO_QUANTITY:
      return {
        ...state,
        cryptoList: {
          ...state.cryptoList,
          quantity: state.cryptoList.quantity + 10,
        },
      };
    case SET_PRICE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default cryptosReducer;
