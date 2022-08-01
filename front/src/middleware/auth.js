import axios from 'axios';
import {
  LOGIN,
  LOGOUT,
  logout,
  saveUser,
  CHECK_TOKEN,
  REGISTER,
  existingUserToggle
} from 'src/actions/user';
import { updateCurrency } from '../actions/cryptos';
import { getCryptoList } from '../actions/cryptos';
import { toggleLoginModal, setDisplaySnackBar } from 'src/actions/settings';
import parseJwt from 'src/services/parseJwt';
import getNewAccessToken from 'src/services/getNewAccessToken';
import isTokenExpired from 'src/services/isTokenExpired';

import { setPending } from 'src/actions/settings';

const auth = (store) => (next) => async (action) => {
  const state = store.getState();
  const refreshToken = localStorage.getItem('refreshToken');
  const { accessToken } = state.user;
  const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

  switch (action.type) {
    case LOGIN:
      // TODO: ajouter la fonction cleanObject de DOM-Purify pour nettoyer les valeurs des champs
      store.dispatch(setPending());
      axios({
        method: 'post',
        baseURL,
        url: '/jwt/login',
        data: {
          email: state.user.email,
          password: state.user.password,
        },
      })
        .then((res) => {
          if (res.status === 200 && res.data.verify) {
            // close the Login modal
            store.dispatch(toggleLoginModal());
            // store tokens
            localStorage.setItem('refreshToken', res.data.refreshToken);
            const newAccessToken = res.headers.authorization;

            // Save user details
            const { user } = parseJwt(res.headers.authorization);
            const { id } = user;
            const userObj = {
              id,
              email: res.data.email,
              nickname: res.data.nickname,
              avatar: res.data.picture,
              accessToken: newAccessToken,
              verify: res.data.verify,
              existingUser: true,
            };
            localStorage.setItem('currency', res.data.currency);
            store.dispatch(updateCurrency(res.data.currency));
            store.dispatch(getCryptoList());
            store.dispatch(saveUser(userObj));
            store.dispatch(setPending());
            store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Bonjour ${userObj.nickname}, vous êtes bien connecté` }));
          } else if (res.status === 200) {
            console.log(res.data)
            store.dispatch(setDisplaySnackBar({ severity: 'error', message: 'Veuillez activer votre compte, vérifiez le dossier SPAM ou ', link: `https://mycryptofolio.fr/v1/${res.data.message}` }));
            store.dispatch(setPending());
          }
        })
        .catch((err, res) => {
          console.log(err.response.data.message);
          store.dispatch(setPending());
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        });
      next(action);
      break;

    case LOGOUT:
      store.dispatch(setPending());
      axios({
        method: 'get',
        baseURL,
        url: `/logout/${refreshToken}`,
        headers: {
          Authorization: store.getState().user.accessToken,
        }
      })
        .then((res) => {
          if (res.status === 200) {
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('currency');
            store.dispatch(setPending());
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          store.dispatch(setPending());
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        })     
      next(action);
      break;

    case REGISTER:
      store.dispatch(setPending());
      axios({
        method: 'post',
        baseURL,
        url: '/signup',
        data: {
          email: state.user.email,
          nickname: state.user.nickname,
          password: state.user.password,
          passwordCheck: state.user.passwordCheck,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            store.dispatch(existingUserToggle())
            store.dispatch(toggleLoginModal());

            const userObj = {
              email: res.data.email,
              nickname: res.data.nickname
            };
            store.dispatch(setPending());
            store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Bienvenue ${userObj.nickname}, un email d'activation de votre compte vous a été envoyé sur ${userObj.email}` }));
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          store.dispatch(setPending());
          store.dispatch(setDisplaySnackBar({ severity: 'warning', message: err.response.data.message }));
        });
      next(action);
      break;
    case CHECK_TOKEN:
      if (isTokenExpired(accessToken) && refreshToken) {
        const { newAccessToken, userData } = await getNewAccessToken(refreshToken);
        const { user } = parseJwt(newAccessToken);
        const { id } = user;

        const userObj = {
          id,
          email: userData.email,
          nickname: userData.nickname,
          avatar: userData.picture,
          accessToken: newAccessToken,
          verify: userData.verify,
        };
        store.dispatch(saveUser(userObj));
      }
      else if ((isTokenExpired(accessToken) && accessToken) && (!refreshToken || isTokenExpired(accessToken))) {
        store.dispatch(logout());
      }

      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default auth;
