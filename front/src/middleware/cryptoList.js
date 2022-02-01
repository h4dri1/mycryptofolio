/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  GET_CRYPTO_LIST,
  updateCryptoList,
  GET_MORE_CRYPTOS,
  getMoreCryptosLoading,
  updateCryptoQuantity,
  getCryptoList,
  GET_ALL_CRYPTOS,
  updateAllCryptos,
  GET_CURRENT_PRICE,
  setPrice,
} from 'src/actions/cryptos';

const cryptoList = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_ALL_CRYPTOS:
      axios({
        method: 'get',
        url: 'https://dev.mycryptofolio.fr/v1/cryptos/USD/100',
      })
        .then((res) => {
          store.dispatch(updateAllCryptos(res.data));
        })
        .catch((err) => console.log(err));
      next(action);
      break;
    case GET_CRYPTO_LIST:
      const { selectedCurrency, quantity } = store.getState().cryptos.cryptoList;

      axios({
        method: 'get',
        url: `https://dev.mycryptofolio.fr/v1/cryptos/${selectedCurrency}/${quantity}`,
      })
        .then((res) => {
          store.dispatch(updateCryptoList(res.data));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (store.getState().cryptos.cryptoList.cryptoListLoading) {
            store.dispatch(getMoreCryptosLoading());
          }
        });
      next(action);
      break;
    case GET_MORE_CRYPTOS:
      store.dispatch(getMoreCryptosLoading());
      store.dispatch(updateCryptoQuantity());
      store.dispatch(getCryptoList());
      next(action);
      break;

    case GET_CURRENT_PRICE:
      const { coinId, dateValue, refCurrency } = action.payload;

      const day = dateValue.getDate() < 10 ? `0${dateValue.getDate()}` : dateValue.getDate();
      const month = dateValue.getMonth() < 9 ? `0${dateValue.getMonth() + 1}` : `${dateValue.getMonth() + 1}`;
      const year = dateValue.getFullYear();

      const requestUrl = coinId ? `https://api.coingecko.com/api/v3/coins/${coinId}/history?date=${day}-${month}-${year}` : `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${day}-${month}-${year}`;
      axios(requestUrl)
        .then((res) => {
          const currentPrice = res.data.market_data.current_price[refCurrency.toLowerCase()];
          // store.dispatch(setPrice((Math.ceil(currentPrice * 100) / 100)));
          store.dispatch(setPrice(Math.ceil(currentPrice)));
        })
        .catch((err) => {
          console.log(err.response);
          store.dispatch(setPrice(0));
        });
      break;

    default:
      next(action);
      break;
  }
};

export default cryptoList;
