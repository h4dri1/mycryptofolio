/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  GET_ALL_CRYPTOS,
  updateAllCryptos,
  GET_NFT_TREND,
  updateNFTTrend,
  GET_CRYPTO_LIST,
  updateCryptoList,
  GET_CRYPTO_TREND,
  updateCryptoTrend,
  GET_MORE_CRYPTOS,
  getMoreCryptosLoading,
  updateCryptoQuantity,
  getCryptoList,
  GET_CURRENT_PRICE,
  setPrice,
} from 'src/actions/cryptos';

import { setPending } from 'src/actions/settings';
import { GET_FEAR_GREED_INDEX, updateFearGreedIndex } from '../actions/cryptos';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const cryptoList = (store) => (next) => (action) => {
  const { logged } = store.getState().user;
  switch (action.type) {
    case GET_ALL_CRYPTOS:
      axios({
        method: 'get',
        baseURL,
        url: '/cryptos/usd/100',
      })
        .then((res) => {
          store.dispatch(updateAllCryptos(res.data));
        })
        .catch((err) => console.log(err));
      next(action);
      break;
      case GET_CRYPTO_TREND:
        axios({
          method: 'get',
          baseURL,
          url: `/trending`,
        })
          .then((res) => {
            store.dispatch(updateCryptoTrend(res.data));
          })
          .catch((err) => {
            console.log(err);
          })
        next(action);
      break;
      case GET_NFT_TREND:
        axios({
          method: 'get',
          baseURL,
          url: `/nft/top`,
        })
          .then((res) => {
            store.dispatch(updateNFTTrend(res.data));
          })
          .catch((err) => {
            console.log(err);
          })
        next(action);
      break;
      case GET_FEAR_GREED_INDEX:
        axios({
          method: 'get',
          baseURL,
          url: `/index/fearandgreed`,
        })
          .then((res) => {
            store.dispatch(updateFearGreedIndex(res.data));
          })
          .catch((err) => {
            console.log(err);
          })
        next(action);
      break;
    case GET_CRYPTO_LIST:

      const { selectedCurrency, quantity } = store.getState().cryptos.cryptoList;

      axios({
        method: 'get',
        baseURL,
        url: `/cryptos/${selectedCurrency}/${quantity}`,
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
      const { coinId, usDate, refCurrency } = action.payload;
      if (!coinId) {
        break;
      }

      const day = usDate.getDate() < 10 ? `0${usDate.getDate()}` : usDate.getDate();
      const month = usDate.getMonth() < 9 ? `0${usDate.getMonth() + 1}` : `${usDate.getMonth() + 1}`;
      const year = usDate.getFullYear();

      const requestOptions = {
        method: 'get',
        baseURL,
        url: `/history/${coinId}/${day}/${month}/${year}`,
      };
      axios(requestOptions)
        .then((res) => {
          const currentPrice = res.data.market_data.current_price[refCurrency.toLowerCase()];
          store.dispatch(setPrice((Math.ceil(currentPrice * 100000000) / 100000000)));
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
