import {
    UPDATE_FAVORITE_CRYPTOS
} from 'src/actions/favorite';

const initialState = {
    favorite: {
        cryptos:[]
    },
}

const favoriteReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_FAVORITE_CRYPTOS:
            return {
              ...state,
              favorite: {
                ...state.cryptos,
                cryptos: action.payload,
              },
          };
        
        default:
        return state;
    }
};

export default favoriteReducer;