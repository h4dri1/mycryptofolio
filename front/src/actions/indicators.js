export const GET_INDICATORS = 'GET_INDICATORS';
export const GET_INDICATORS_SUCCESS = 'GET_INDICATORS_SUCCESS';

export const getIndicators = () => ({
    type: GET_INDICATORS,
});

export const getIndicatorsSuccess = (payload) => ({
    type: GET_INDICATORS_SUCCESS,
    payload,
});
