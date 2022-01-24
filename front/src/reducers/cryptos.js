import { UPDATE_CRYPTO_LIST, UPDATE_CRYPTO_QUANTITY, GET_MORE_CRYPTOS_LOADING } from 'src/actions/cryptos';

const initialState = {
    cryptoList: {
        selectedCurrency: 'usd',
        quantity: 10,
        cryptoListLoading: false,
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
            }
        default:
            return state;
    }
}

export default cryptos;
