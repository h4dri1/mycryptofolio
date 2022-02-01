export const GET_CRYPTO_DESCRIPTION = 'GET_CRYPTO_DESCRIPTION';
export const GET_INDICATORS = 'GET_INDICATORS';

export const getCryptoDescription = () => ({
    type: GET_CRYPTO_DESCRIPTION,
});

export const getIndicators = () => ({
    type: GET_INDICATORS,
});