import axios from 'axios';
import { LOGIN, LOGOUT, saveUser } from 'src/actions/user';
import { toggleLoginModal } from 'src/actions';
import parseJwt from 'src/services/parseJwt';

const auth = (store) => (next) => (action) => {
  const state = store.getState();
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
          // TODO: alert should be superseded by opening AlertMessage component (src/common)
            alert(`${res.data.status}, vous êtes bien connecté`);

            // close the Login modal
            store.dispatch(toggleLoginModal());

            // store tokens
            localStorage.setItem('refreshToken', res.data.refreshToken);
            localStorage.setItem('accessToken', res.headers.authorization);

            // Save user details
            const { data } = parseJwt(res.headers.authorization);
            const { email, nickname, picture } = data;
            const user = {
              email,
              nickname,
              avatar: picture,
            };

            store.dispatch(saveUser(user));
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
      localStorage.removeItem('accessToken');
      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default auth;
