import {
    FETCH_CRYPTO_DATA, FETCH_CRYPTO_DATA_SUCCESS
} from 'src/actions/cryptoDetails';

const initialState = {
    loading: true,
    data: {
        name: "",
    },
    chart: {}
}

const cryptoDetailsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_CRYPTO_DATA: {
            return {
                ...state,
                loading: true,
            };
        }
        case FETCH_CRYPTO_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                chart: action.payload.chart,
                loading: false
            };
        default:
            return state;
    }
};

export default cryptoDetailsReducer;