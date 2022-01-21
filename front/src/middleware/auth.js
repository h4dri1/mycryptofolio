import axios from 'axios';
import { LOGIN } from "../actions/user";

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN:
      const state = store.getState();
      console.log(state)
      axios.post('https://dev.mycryptofolio.fr/v1/login', {
          email: state.user.email,
          password:state.user.password,
          // email: "test@test.fr",
          // password: "#0clock$0087",
        }
      )
     .then((res) => {
       alert(`${res.data}, vous êtes bien connecté`)
     })
     .catch((err) => console.log(err));
      
      break;
  
    default:
      next(action);
      break;
  }
};

export default auth;
