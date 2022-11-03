import axios from 'axios';

import { FETCH_CRYPTO_DATA, updateCryptoData, FETCH_CHART_DATA } from 'src/actions/cryptoDetails';

import { setPending } from 'src/actions/settings';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const cryptoDetails = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CRYPTO_DATA:
      var { selectedCurrency } = store.getState().cryptos.cryptoList;
      axios({
        method: 'get',
        baseURL,
        url: `/crypto/${action.payload}/${selectedCurrency}/${action.days}`,
      })
        .then((res) => {
          // fetchCryptoDataSuccess(res.data)
          store.dispatch(updateCryptoData(res.data));
        })
        .catch((err) => {
          console.log(err);
        });

      next(action);
      break;
    case FETCH_CHART_DATA:

      var { selectedCurrency } = store.getState().cryptos.cryptoList;
      axios({
        method: 'get',
        baseURL,
        url: `/crypto/${action.payload}/${selectedCurrency}/${action.days}`,
      })
        .then((res) => {
          // fetchCryptoDataSuccess(res.data)
          store.dispatch(updateCryptoData(res.data));
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

export default cryptoDetails;
