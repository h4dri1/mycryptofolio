export const GET_CRYPTO_DESCRIPTION = 'GET_CRYPTO_DESCRIPTION';
export const GET_INDICATORS = 'GET_INDICATORS';
export const GET_CRYPTO_DATA = 'GET_CRYPTO_DATA';

export const getCryptoDescription = () => ({
    type: GET_CRYPTO_DESCRIPTION,
});

export const getIndicators = () => ({
    type: GET_INDICATORS,
});

export const getCryptoData = () => ({
    type: GET_CRYPTO_DATA,
});