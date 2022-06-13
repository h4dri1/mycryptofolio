/* eslint-disable no-case-declarations */
import axios from 'axios';
import { useSelector } from 'react-redux';

import {
  CHANGE_USER
} from 'src/actions/user';

import { saveNewToken, saveUser } from 'src/actions/user';
import { setDisplaySnackBar, toggleConfirmDelete } from 'src/actions/settings';

import parseJwt from 'src/services/parseJwt';
import isTokenExpired from 'src/services/isTokenExpired';
import getNewAccessToken from 'src/services/getNewAccessToken';

const profil = (store) => (next) => async (action) => {
  const privateRoute = axios.create({
    baseURL: `${process.env.PRIVATE_API_BASE_URL}`,
  });

  privateRoute.interceptors.request.use(async (req) => {
    const accessToken = req.headers.Authorization;
    const refreshToken = localStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken) && refreshToken) {
      const newAccessToken = await getNewAccessToken(refreshToken);
      req.headers.Authorization = newAccessToken;

      const { user } = parseJwt(newAccessToken);
      const { email, nickname, picture } = user;
      const userObj = {
        email,
        nickname,
        avatar: picture,
        accessToken: newAccessToken,
      };
      store.dispatch(saveUser(userObj));

      return req;
    }
    return req;
  });

  switch (action.type) {
    case CHANGE_USER:
      privateRoute({
        method: 'post',
        url: '/signup/change',
        headers: {
          Authorization: store.getState().user.accessToken,
        },
        data: {
          id: action.payload.id,
          email: action.payload.email,
          nickname: action.payload.nickname,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            const newAccessToken = res.headers.authorization;
            const userObj = {
                id: action.payload.id,
                email: action.payload.email,
                nickname: action.payload.nickname,
                accessToken: newAccessToken,
            };
            store.dispatch(saveUser(userObj));
            store.dispatch(saveNewToken(newAccessToken));
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }
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

export default profil;
