/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  FETCH_FAVORITE_CRYPTOS, updateFavoriteCryptos, ADD_FAVORITE_CRYPTO,
} from 'src/actions/favorite';

import { saveNewToken, saveUser } from 'src/actions/user';
import { setDisplaySnackBar, toggleConfirmDelete } from 'src/actions/settings';

import parseJwt from 'src/services/parseJwt';
import isTokenExpired from 'src/services/isTokenExpired';
import getNewAccessToken from 'src/services/getNewAccessToken';
import { DELETE_FAVORITE_CRYPTO, fetchFavoriteCryptos } from '../actions/favorite';

const favorite = (store) => (next) => async (action) => {
  const privateRoute = axios.create({
    baseURL: `${process.env.PRIVATE_API_BASE_URL}`,
  });

  privateRoute.interceptors.request.use(async (req) => {
    const accessToken = req.headers.Authorization;
    const refreshToken = localStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken) && refreshToken) {
      const { newAccessToken, userData } = await getNewAccessToken(refreshToken);
      req.headers.Authorization = newAccessToken;

      const { user } = parseJwt(newAccessToken);
      const { id } = user;
      const userObj = {
        id,
        email: userData.email,
        nickname: userData.nickname,
        avatar: userData.picture,
        accessToken: newAccessToken,
        currency: userData.currency,
      };
      store.dispatch(saveUser(userObj));

      return req;
    }
    return req;
  });

  switch (action.type) {
    case FETCH_FAVORITE_CRYPTOS:
      privateRoute({
        method: 'get',
        url: '/favorite',
        headers: {
          Authorization: store.getState().user.accessToken,
        },

      })
        .then((res) => {
          store.dispatch(updateFavoriteCryptos(res.data));
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          console.log(err);
        });
      next(action);
      break;
    case ADD_FAVORITE_CRYPTO:
      privateRoute({
        method: 'post',
        url: `/favorite/${action.payload}`,
        headers: {
          Authorization: store.getState().user.accessToken,
        },

      })
        .then((res) => {
          if (res.status === 204) {
            store.dispatch(fetchFavoriteCryptos());
            const newAccessToken = res.headers.authorization;
            store.dispatch(saveNewToken(newAccessToken));
          }
        })
        .catch((err) => {
          console.log(err);
        });
      next(action);
      break;
    case DELETE_FAVORITE_CRYPTO:
      privateRoute({
        method: 'delete',
        url: `/favorite/${action.payload}`,
        headers: {
          Authorization: store.getState().user.accessToken,
        },
      })
        .then((res) => {
          store.dispatch(fetchFavoriteCryptos());
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          console.log(err);
        });
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default favorite;
