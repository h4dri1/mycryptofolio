import {
  FETCH_NFT_DATA, FETCH_NFT_DATA_SUCCESS,
} from 'src/actions/nftDetails';

const initialState = {
  loading: true,
  data: {
    list: [],
  },
};

const nftDetailsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_NFT_DATA: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_NFT_DATA_SUCCESS: {
      return {
        ...state,
        data: {
          ...state.data,
          list: action.payload,
        },
      };
    }
    default:
      return state;
  }
};

export default nftDetailsReducer;
