import axios from 'axios';
import {
  LOGIN,
  LOGOUT,
  logout,
  saveUser,
  CHECK_TOKEN,
  REGISTER,
} from 'src/actions/user';
import { toggleLoginModal } from 'src/actions/settings';
import parseJwt from 'src/services/parseJwt';
import getNewAccessToken from 'src/services/getNewAccessToken';
import isTokenExpired from 'src/services/isTokenExpired';

const auth = (store) => (next) => async (action) => {
  const state = store.getState();
  const refreshToken = localStorage.getItem('refreshToken');
  const { accessToken } = state.user;

  switch (action.type) {
    case LOGIN:
      // TODO: ajouter la fonction cleanObject de DOM-Purify pour nettoyer les valeurs des champs
      axios.post('https://dev.mycryptofolio.fr/v1/jwt/login', {
        email: state.user.email,
        password: state.user.password,
        // email: "test@test.fr",
        // password: "#0clock$0087",
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
            const { email, nickname, picture } = user;
            const userObj = {
              email,
              nickname,
              avatar: picture,
              accessToken: newAccessToken,
            };
            store.dispatch(saveUser(userObj));
            // TODO: alert should be superseded by opening AlertMessage component (src/common)
            alert(`Bonjour ${nickname}, vous êtes bien connecté`);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
          alert(`${err.response.data}`);
        });
      next(action);
      break;

    case LOGOUT:
      localStorage.removeItem('refreshToken');
      next(action);
      break;

    case REGISTER:
      console.log('here');
      next(action);
      break;
    case CHECK_TOKEN:

      // console.log('isTokenExpired', isTokenExpired());
      if (isTokenExpired(accessToken) && refreshToken) {
        const newAccessToken = await getNewAccessToken(refreshToken);
        const { user } = parseJwt(newAccessToken);
        const { email, nickname, picture } = user;
        const userObj = {
          email,
          nickname,
          avatar: picture,
          accessToken: newAccessToken,
        };
        store.dispatch(saveUser(userObj));
      }
      else if (isTokenExpired(accessToken) && !refreshToken) {
        store.dispatch(logout());
        store.dispatch(toggleLoginModal());
      }

      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default auth;
