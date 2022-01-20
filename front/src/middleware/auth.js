import axios from 'axios';
import { LOGIN } from "../actions/user";

const auth = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN:
      const state = store.getState();
      axios.post('http://mycryptofolio.fr:8888/v1/login', {
          email: state.user.email,
          password:state.user.password,
          // email: "test@test.fr",
          // password: "#0clock$0087",
        }
      )
     .then((res) => {
       alert(`${res.data}, vous êtes bien connecté`)
     })
      
      break;
  
    default:
      next(action);
      break;
  }
};

export default auth;
