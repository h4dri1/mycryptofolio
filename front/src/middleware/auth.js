import axios from 'axios';
import {
  LOGIN,
  LOGOUT,
  logout,
  saveUser,
  CHECK_TOKEN,
  REGISTER,
} from 'src/actions/user';
import { toggleLoginModal, setDisplaySnackBar } from 'src/actions/settings';
import parseJwt from 'src/services/parseJwt';
import getNewAccessToken from 'src/services/getNewAccessToken';
import isTokenExpired from 'src/services/isTokenExpired';

const auth = (store) => (next) => async (action) => {
  const state = store.getState();
  const refreshToken = localStorage.getItem('refreshToken');
  const { accessToken } = state.user;
  const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

  switch (action.type) {
    case LOGIN:
      // TODO: ajouter la fonction cleanObject de DOM-Purify pour nettoyer les valeurs des champs
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
          if (res.status === 200) {
            // close the Login modal
            store.dispatch(toggleLoginModal());
            // store tokens
            localStorage.setItem('refreshToken', res.data.refreshToken);
            const newAccessToken = res.headers.authorization;

            // Save user details
            const { user } = parseJwt(res.headers.authorization);
            const { email, nickname, picture, id } = user;
            const userObj = {
              id,
              email,
              nickname,
              avatar: picture,
              accessToken: newAccessToken,
            };
            store.dispatch(saveUser(userObj));
            store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Bonjour ${nickname}, vous êtes bien connecté` }));
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        });
      next(action);
      break;

    case LOGOUT:
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
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        })     
      next(action);
      break;

    case REGISTER:
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
            store.dispatch(toggleLoginModal());
            localStorage.setItem('refreshToken', res.data.refreshToken);
            const newAccessToken = res.headers.authorization;

            // Save user details
            const { user } = parseJwt(res.headers.authorization);
            const { email, nickname, picture, id } = user;

            const userObj = {
              id,
              email,
              nickname,
              avatar: picture,
              accessToken: newAccessToken,
              existingUser: true,
            };
            store.dispatch(saveUser(userObj));
            store.dispatch(setDisplaySnackBar({ severity: 'success', message: `Bienvenue ${nickname} !` }));
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          store.dispatch(setDisplaySnackBar({ severity: 'warning', message: err.response.data.message }));
        });
      next(action);
      break;
    case CHECK_TOKEN:
      if (isTokenExpired(accessToken) && refreshToken) {
        const newAccessToken = await getNewAccessToken(refreshToken);
        const { user } = parseJwt(newAccessToken);
        const { email, nickname, picture, id } = user;

        const userObj = {
          id,
          email,
          nickname,
          avatar: picture,
          accessToken: newAccessToken,
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
