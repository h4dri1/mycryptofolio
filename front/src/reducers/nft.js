import {
  UPDATE_NFT_LIST,
  UPDATE_NFT_QUANTITY,
  GET_MORE_NFT_LOADING,
  RESET_NFT_QUANTITY,
} from 'src/actions/nft';

const curr = localStorage.getItem('currency');

if (curr === null || !curr || curr === 'undefined') {
  var currency = 'USD';
}
else {
  var currency = curr;
}

const initialState = {
  NFTList: {
    selectedCurrency: currency,
    quantity: 5,
    NFTListLoading: false,
    list: [],
  },
};

const NFTReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_NFT_LIST:
      return {
        ...state,
        NFTList: {
          ...state.NFTList,
          list: action.payload,
        },
      };
    case GET_MORE_NFT_LOADING:
      return {
        ...state,
        NFTList: {
          ...state.NFTList,
          NFTListLoading: !state.NFTList.NFTListLoading,
        },
      };
    case UPDATE_NFT_QUANTITY:
      return {
        ...state,
        NFTList: {
          ...state.NFTList,
          quantity: state.NFTList.quantity + 10,
        },
      };
    case RESET_NFT_QUANTITY:
      return {
        ...state,
        NFTList: {
          ...state.NFTList,
          quantity: 5,
        },
      };
    default:
      return state;
  }
};

export default NFTReducer;
