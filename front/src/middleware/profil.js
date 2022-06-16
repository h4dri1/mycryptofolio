/* eslint-disable no-case-declarations */
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import {
  CHANGE_USER,
  CHANGE_PASSWORD,
  CHANGE_AVATAR,
  CHANGE_CURRENCY
} from 'src/actions/user';

import { updateCurrency } from 'src/actions/cryptos';

//import { UPDATE_CURRENCY } from '../actions/cryptos';

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
    case CHANGE_PASSWORD:
      privateRoute({
        method: 'post',
        url: '/signup/change/password',
        headers: {
          Authorization: store.getState().user.accessToken,
        },
        data: {
          oldPass: action.payload.oldPass,
          pass: action.payload.pass,
          passConfirm: action.payload.passConfirm
        },
      })
        .then((res) => {
          if (res.status === 201) {
            const newAccessToken = res.headers.authorization;
            store.dispatch(saveNewToken(newAccessToken));
            store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Votre mot de passe à bien été mis à jour` }));
          }
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        });
      next(action);
      break;
      case CHANGE_USER:
      privateRoute({
        method: 'post',
        url: '/signup/change/user',
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
            store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Modification réussi` }));
          }
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        });
      next(action);
      break;
      case CHANGE_AVATAR:
        const formData = new FormData();
        formData.append('file', action.payload.avatar);
        formData.append('upload_preset', 'profilPic');
        formData.append('cloud_name', 'mycryptofolio');
        axios.post('https://api.cloudinary.com/v1_1/mycryptofolio/image/upload', formData)
          .then(res => {
            const { url } = res.data;
            const imgObj = {
              avatar: url
            }
            privateRoute({
              method: 'post',
              url: '/signup/change/avatar',
              headers: {
                Authorization: store.getState().user.accessToken,
              },
              data: {
                avatar: url
              }
            })
            .then((res) => {
              if (res.status === 201) {
                const newAccessToken = res.headers.authorization;
                store.dispatch(saveNewToken(newAccessToken));
                localStorage.setItem('refreshToken', res.data.refreshToken);
                store.dispatch(saveUser(imgObj));
                store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Votre photo de profil à bien été mis à jour` }));
              }
            })
            .catch((err) => {
              console.log(err);
              store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
            });
          })
        break;
        case CHANGE_CURRENCY:
            privateRoute({
              method: 'post',
              url: '/signup/change/currency',
              headers: {
                Authorization: store.getState().user.accessToken,
              },
              data: {
                currency: action.payload.cur
              }
            })
            .then((res) => {
              if (res.status === 201) {
                localStorage.setItem('currency', action.payload.cur);
                const newAccessToken = res.headers.authorization;
                store.dispatch(saveNewToken(newAccessToken));
                store.dispatch(updateCurrency(action.payload.cur));
                store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Devise modifiée` }));
              }
            })
            .catch((err) => {
              console.log(err);
              store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
            });
        break;
        default:
        next(action);
        break;
    }
};

export default profil;
