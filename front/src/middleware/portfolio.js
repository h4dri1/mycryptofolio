/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  CREATE_NEW_WALLET, toggleCreateWalletModal,
  FETCH_PORTFOLIO, fetchPortfolioSuccess,
  FETCH_SPECIFIC_PORTFOLIO, fetchSpecificPortfolioSuccess,
  updateWalletList, DELETE_WALLET, deleteOrUpdateWalletSuccess,
  SAVE_TRANSACTION, fetchPortfolio, DELETE_TRANSACTION,
  UPDATE_WALLET, toggleUpdateWalletModal,
} from 'src/actions/portfolio';

import { checkToken, saveNewToken } from 'src/actions/user';
import { setDisplaySnackBar } from 'src/actions/settings';

const portfolio = (store) => (next) => (action) => {
  switch (action.type) {
    case CREATE_NEW_WALLET:
      const { inputText } = store.getState().portfolio.createWallet;

      axios({
        method: 'post',
        url: 'https://dev.mycryptofolio.fr/v1/portfolio/wallet',
        headers: {
          Authorization: store.getState().user.accessToken,
        },
        data: {
          label: inputText,
        },
      })
        .then((res) => {
          store.dispatch(updateWalletList(res.data));
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => store.dispatch(toggleCreateWalletModal()));
      next(action);
      break;
    case UPDATE_WALLET:
      const { inputText: newWalletName } = store.getState().portfolio.editWallet;

      axios({
        method: 'post',
        url: 'https://dev.mycryptofolio.fr/v1/portfolio/wallet',
        headers: {
          Authorization: store.getState().user.accessToken,
        },
        data: {
          id: action.payload,
          label: newWalletName,
        },
      })
        .then((res) => {
          const { wallet: wallets } = store.getState().portfolio;
          wallets.forEach((wallet) => {
            if (wallet.id === action.payload) wallet.label = newWalletName;
          });

          store.dispatch(deleteOrUpdateWalletSuccess(wallets));

          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => store.dispatch(toggleUpdateWalletModal()));
      next(action);
      break;
    case DELETE_WALLET:
      if (action.payload !== undefined) {
        axios({
          method: 'delete',
          url: `https://dev.mycryptofolio.fr/v1/portfolio/wallet/${action.payload}`,
          headers: {
            Authorization: store.getState().user.accessToken,
          },
        })
          .then((res) => {
            if (res.status === 204) {
              const { wallet: wallets } = store.getState().portfolio;
              const updatedWalletList = wallets.filter((wallet) => wallet.id !== action.payload);
              store.dispatch(deleteOrUpdateWalletSuccess(updatedWalletList));
              const newAccessToken = res.headers.authorization;
              store.dispatch(saveNewToken(newAccessToken));
            }
          })
          .catch((err) => console.log(err));
      }
      next(action);
      break;
    case FETCH_PORTFOLIO:
      // store.dispatch(checkToken());

      axios({
        method: 'get',
        url: 'https://dev.mycryptofolio.fr/v1/portfolio',
        headers: {
          Authorization: store.getState().user.accessToken,
        },
      })
        .then((res) => {
          store.dispatch(fetchPortfolioSuccess(res.data));
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => console.log(err));
      next(action);
      break;
    case FETCH_SPECIFIC_PORTFOLIO:
      axios({
        method: 'get',
        url: `https://dev.mycryptofolio.fr/v1/portfolio/wallet/${action.payload}`,
        headers: {
          Authorization: store.getState().user.accessToken,
        },
      })
        .then((res) => {
          store.dispatch(fetchSpecificPortfolioSuccess(res.data));
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => console.log(err));
      next(action);
      break;

    case SAVE_TRANSACTION:
      const walletId = store.getState().portfolio.selectedWallet;

      // * Pour éviter d'envoyer une transaction orpheline à l'API
      if (!walletId) {
        store.dispatch(setDisplaySnackBar({ severity: 'error', message: 'Veuillez selectionner un portefeuille pour votre transaction' }));
        next(action);
        break;
      }
      const config = {
        method: 'post',
        baseURL: 'https://dev.mycryptofolio.fr/v1',
        url: `/portfolio/wallet/${walletId}/transaction`,
        headers: {
          Authorization: store.getState().user.accessToken,
        },
        data: { ...action.payload },
      };

      console.log('config axios: ', config);

      axios.request(config)
        .then((res) => {
          console.log(res);
          store.dispatch(fetchPortfolio());
        })
        .catch((err) => {
          console.log(err.response);
          alert(err.response.data);
        });
      next(action);
      break;
    case DELETE_TRANSACTION:
      if (action.payload !== undefined) {
        axios({
          method: 'delete',
          url: `https://dev.mycryptofolio.fr/v1/portfolio/transaction/${action.payload}`,
          headers: {
            Authorization: store.getState().user.accessToken,
          },
        })
          .then((res) => {
            if (res.status === 204) {
              store.dispatch(fetchPortfolio());
              const newAccessToken = res.headers.authorization;
              store.dispatch(saveNewToken(newAccessToken));
            }
          })
          .catch((err) => console.log(err));
      }
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default portfolio;
