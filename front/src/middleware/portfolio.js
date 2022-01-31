/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  CREATE_NEW_WALLET, toggleCreateWalletModal,
  FETCH_PORTFOLIO, fetchPortfolioSuccess,
  FETCH_SPECIFIC_PORTFOLIO, fetchSpecificPortfolioSuccess,
} from 'src/actions/portfolio';

import { checkToken, saveNewToken } from 'src/actions/user';

const portfolio = (store) => (next) => (action) => {
  switch (action.type) {
    case CREATE_NEW_WALLET:
      const { inputText } = store.getState().portfolio.createWallet;

      store.dispatch(toggleCreateWalletModal());
      alert(`Le portefeuille ${inputText} a bien été créé.`);

      // axios({
      //   method: 'post',
      //   url: 'https://dev.mycryptofolio.fr/v1/portfolio',
      //   data: {
      //     name: inputText,
      //   },
      // })
      //   .then((res) => {
      //     /*
      //       Créer une nouvelle action pour mettre à jour la liste des portfolio du client
      //       store.dispatch(nouvelleAction(res.data))
      //       store.dispatch(toggleCreateWalletModal())
      //     */
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
    default:
      next(action);
      break;
  }
};

export default portfolio;
