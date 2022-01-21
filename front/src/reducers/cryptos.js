import { UPDATE_CRYPTO_LIST } from 'src/actions/cryptos';

const initialState = {
    cryptoList: {
        quantity: 10,
        list: []
    }
}

const cryptos = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_CRYPTO_LIST:
            console.log("and here");
            return {
                ...state,
                cryptoList: {
                    ...cryptoList,
                    list: action.payload 
                },
            };
        default:
            return state;
    }
}

export default cryptos;
