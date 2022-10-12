export const FETCH_FAVORITE_CRYPTOS = 'FETCH_FAVORITE_CRYPTOS';
export const UPDATE_FAVORITE_CRYPTOS = 'UPDATE_FAVORITE_CRYPTOS';
export const ADD_FAVORITE_CRYPTO = 'ADD_FAVORITE_CRYPTO';
export const DELETE_FAVORITE_CRYPTO = 'DELETE_FAVORITE_CRYPTO';

export const fetchFavoriteCryptos = () => ({
    type: FETCH_FAVORITE_CRYPTOS,
});

export const updateFavoriteCryptos = (payload) => ({
    type: UPDATE_FAVORITE_CRYPTOS,
    payload,
});

export const addFavoriteCrypto = (payload) => ({
    type: ADD_FAVORITE_CRYPTO,
    payload,
});

export const deleteFavoriteCrypto = (payload) => ({
    type: DELETE_FAVORITE_CRYPTO,
    payload,
});
