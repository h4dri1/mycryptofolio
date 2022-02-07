import axios from 'axios';

import { FETCH_CRYPTO_DATA, fetchCryptoDataSuccess } from 'src/actions/cryptoDetails';
// import { getCryptoData } from '../actions/cryptoDetails';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const cryptoDetails = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CRYPTO_DATA:
      axios({
        method: 'get',
        baseURL,
        url: `/crypto/${action.payload}`,
      })
        .then((res) => {
          console.log(res.data);
          // fetchCryptoDataSuccess(res.data)
          store.dispatch(fetchCryptoDataSuccess(res.data));
        })
        .catch((err) => console.log(err));

      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default cryptoDetails;
