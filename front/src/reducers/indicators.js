import { GET_INDICATORS_SUCCESS } from 'src/actions/indicators';

const initialState = {
    // indicators
    total_market_cap: {},
    total_volume: {},
    market_cap_percentage: {},
};

const indicatorsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_INDICATORS_SUCCESS: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
};

export default indicatorsReducer;