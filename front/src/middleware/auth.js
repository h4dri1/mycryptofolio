import axios from 'axios';
import { LOGIN } from "../actions/user";
import { toggleLoginModal } from "../actions";

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN:
      const state = store.getState();
      // TODO: ajouter la fonction cleanObject de DOM-Purify pour nettoyer les valeurs des champs
      axios.post('https://dev.mycryptofolio.fr/v1/login', {
          email: state.user.email,
          password:state.user.password,
          // email: "test@test.fr",
          // password: "#0clock$0087",
        }
      )
     .then((res) => {
       if (res.status === 200) {
         // TODO: alert should be superseded by opening AlertMessage component (src/common)
         alert(`${res.data}, vous êtes bien connecté`)
         // close the Login modal
         store.dispatch(toggleLoginModal())
       }
     })
     .catch((err) => {
        console.log(err.response.data)
        alert(`${err.response.data}`)
      });
      next(action);
      break;
  
    default:
      next(action);
      break;
  }
};

export default auth;
