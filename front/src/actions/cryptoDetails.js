export const FETCH_CRYPTO_DATA = 'FETCH_CRYPTO_DATA';
export const UPDATE_CRYPTO_DATA = 'UPDATE_CRYPTO_DATA';
export const FETCH_CHART_DATA = 'FETCH_CHART_DATA';

export const fetchCryptoData = (payload, days) => ({
    type: FETCH_CRYPTO_DATA,
    payload, days,
});

export const updateCryptoData = (payload) => ({
    type: UPDATE_CRYPTO_DATA,
    payload,
});

export const fetchChartData = (payload, days) => ({
    type: FETCH_CHART_DATA,
    payload, days,
});
