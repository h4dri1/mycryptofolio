import axios from 'axios';

import { FETCH_CRYPTO_DATA, updateCryptoData, FETCH_CHART_DATA } from 'src/actions/cryptoDetails';

import { setPending } from 'src/actions/settings';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const cryptoDetails = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_CRYPTO_DATA:
      store.dispatch(setPending())
      var { selectedCurrency } = store.getState().cryptos.cryptoList;
      axios({
        method: 'get',
        baseURL,
        url: `/crypto/${action.payload}/${selectedCurrency}/${action.days}`,
      })
        .then((res) => {
          // fetchCryptoDataSuccess(res.data)
          store.dispatch(updateCryptoData(res.data));
          store.dispatch(setPending())
        })
        .catch((err) => {
          console.log(err)
          store.dispatch(setPending())
        });

      next(action);
      break;
      case FETCH_CHART_DATA:
        store.dispatch(setPending())
        var { selectedCurrency } = store.getState().cryptos.cryptoList;
        axios({
          method: 'get',
          baseURL,
          url: `/crypto/${action.payload}/${selectedCurrency}/${action.days}`,
        })
          .then((res) => {
            // fetchCryptoDataSuccess(res.data)
            store.dispatch(updateCryptoData(res.data));
            store.dispatch(setPending())
          })
          .catch((err) => {
            console.log(err)
            store.dispatch(setPending())
          });
  
        next(action);
        break;
    default:
      next(action);
      break;
  }
};

export default cryptoDetails;
