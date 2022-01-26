import {
  UPDATE_CRYPTO_LIST, UPDATE_CRYPTO_QUANTITY, GET_MORE_CRYPTOS_LOADING, UPDATE_ALL_CRYPTOS,
} from 'src/actions/cryptos';

const initialState = {
  allCryptos: [],
  cryptoList: {
    selectedCurrency: 'usd',
    quantity: 10,
    cryptoListLoading: false,
    list: [],
  },
};

const cryptosReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_ALL_CRYPTOS:
      return {
        ...state,
        allCryptos: action.payload,
      };
    case UPDATE_CRYPTO_LIST:
      return {
        ...state,
        cryptoList: {
          ...state.cryptoList,
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
    default:
      return state;
  }
};

export default cryptosReducer;
