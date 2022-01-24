import { UPDATE_CRYPTO_LIST, UPDATE_CRYPTO_QUANTITY } from 'src/actions/cryptos';

const initialState = {
    cryptoList: {
        quantity: 10,
        list: []
    }
}

const cryptos = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_CRYPTO_LIST:
            return {
                ...state,
                cryptoList: {
                    ...state.cryptoList,
                    list: action.payload 
                },
            };
        case UPDATE_CRYPTO_QUANTITY:
            return {
                ...state,
                cryptoList: {
                    ...state.cryptoList,
                    quantity: state.cryptoList.quantity + 10,
                }, 
            }
        default:
            return state;
    }
}

export default cryptos;
