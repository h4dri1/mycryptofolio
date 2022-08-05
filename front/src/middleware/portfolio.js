/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  CREATE_NEW_WALLET, toggleCreateWalletModal,
  FETCH_PORTFOLIO, fetchPortfolioSuccess,
  FETCH_SPECIFIC_WALLET, fetchSpecificWalletSuccess,
  updateWalletList, DELETE_WALLET, deleteOrUpdateWalletSuccess,
  SAVE_TRANSACTION, DELETE_TRANSACTION,
  UPDATE_WALLET, toggleUpdateWalletModal, fetchSpecificWallet,
} from 'src/actions/portfolio';

import { setPending } from 'src/actions/settings';

import { saveNewToken, saveUser } from 'src/actions/user';
import { setDisplaySnackBar, toggleConfirmDelete } from 'src/actions/settings';

import parseJwt from 'src/services/parseJwt';
import isTokenExpired from 'src/services/isTokenExpired';
import getNewAccessToken from 'src/services/getNewAccessToken';

const portfolio = (store) => (next) => async (action) => {
  const privateRoute = axios.create({
    baseURL: `${process.env.PRIVATE_API_BASE_URL}`,
  });

  privateRoute.interceptors.request.use(async (req) => {
    const accessToken = req.headers.Authorization;
    const refreshToken = localStorage.getItem('refreshToken');

    if (isTokenExpired(accessToken) && refreshToken) {
      const { newAccessToken, userData } = await getNewAccessToken(refreshToken);
      req.headers.Authorization = newAccessToken;

      const { user } = parseJwt(newAccessToken);
      const { id } = user;
      const userObj = {
        id,
        email: userData.email,
        nickname: userData.nickname,
        avatar: userData.picture,
        accessToken: newAccessToken,
        currency: userData.currency,
      };
      store.dispatch(saveUser(userObj));

      return req;
    }
    return req;
  });

  const { selectedCurrency } = store.getState().cryptos.cryptoList;

  switch (action.type) {
    case CREATE_NEW_WALLET:
      store.dispatch(setPending())
      const { inputText } = store.getState().portfolio.createWallet;

      privateRoute({
        method: 'post',
        url: '/portfolio/wallet',
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
          store.dispatch(setPending())
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          store.dispatch(setPending())
          console.log(err);
        })
        .finally(() => {
          store.dispatch(toggleCreateWalletModal())
        });
      next(action);
      break;
    case UPDATE_WALLET:
      store.dispatch(setPending())
      const { inputText: newWalletName } = store.getState().portfolio.editWallet;
      privateRoute({
        method: 'post',
        url: '/portfolio/wallet',
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
          store.dispatch(setPending())
          console.log(err);
        })
        .finally(() => {
          store.dispatch(toggleUpdateWalletModal())
        });
      next(action);
      break;
    case DELETE_WALLET:
      store.dispatch(setPending())
      if (action.payload !== undefined) {
        privateRoute({
          method: 'delete',
          url: `/portfolio/wallet/${action.payload}`,
          headers: {
            Authorization: store.getState().user.accessToken,
          },
        })
          .then((res) => {
            if (res.status === 204) {
              const { wallet: wallets } = store.getState().portfolio;
              const updatedWalletList = wallets.filter((wallet) => wallet.id !== action.payload);
              store.dispatch(deleteOrUpdateWalletSuccess(updatedWalletList));
              store.dispatch(toggleConfirmDelete());
              store.dispatch(setPending())
              const newAccessToken = res.headers.authorization;
              store.dispatch(saveNewToken(newAccessToken));
            }
          })
          .catch((err) => {
            console.log(err)
            store.dispatch(setPending())
          });
      }
      next(action);
      break;
    case FETCH_PORTFOLIO:
      store.dispatch(setPending())
      privateRoute({
        method: 'get',
        url: `/portfolio/${selectedCurrency}`,
        headers: { Authorization: store.getState().user.accessToken },
      })
        .then((res) => {
          store.dispatch(fetchPortfolioSuccess(res.data));
          store.dispatch(setPending())
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          console.log(err)
          store.dispatch(setPending())
        });
      next(action);
      break;
    case FETCH_SPECIFIC_WALLET:
      store.dispatch(setPending())
      privateRoute({
        method: 'get',
        url: `/portfolio/wallet/${action.payload}/${selectedCurrency}`,
        headers: {
          Authorization: store.getState().user.accessToken,
        },
      })
        .then((res) => {
          const { distribution, performance, transactions, wallet: updatedWallet} = res.data;
          const { wallet: wallets } = store.getState().portfolio;

          const updatedWallets = wallets.map((wallet) => {
            if (wallet.id === updatedWallet.id) {
              return wallet = updatedWallet;
            };
            return wallet;
          });

          const walletsObj = {
            distribution,
            performance,
            transactions,
            wallet: updatedWallets,
          }

          store.dispatch(fetchSpecificWalletSuccess(walletsObj));
          store.dispatch(setPending())
          const newAccessToken = res.headers.authorization;
          store.dispatch(saveNewToken(newAccessToken));
        })
        .catch((err) => {
          console.log(err);
          store.dispatch(setPending())
        })
      next(action);
      break;

    case SAVE_TRANSACTION:
      store.dispatch(setPending())
      const walletId = store.getState().portfolio.selectedWallet;

      // * Pour éviter d'envoyer une transaction orpheline à l'API
      if (!walletId) {
        store.dispatch(setDisplaySnackBar({ severity: 'error', message: 'Veuillez selectionner un portefeuille pour votre transaction' }));
        next(action);
        break;
      }
      const config = {
        method: 'post',
        url: `/portfolio/wallet/${walletId}/transaction`,
        headers: {
          Authorization: store.getState().user.accessToken,
        },
        data: { ...action.payload },
      };

      privateRoute.request(config)
        .then((res) => {
          console.log(res);
          store.dispatch(fetchSpecificWallet(walletId));
          store.dispatch(setPending())
        })
        .catch((err) => {
          console.log(err.response);
          store.dispatch(setPending())
          store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        });
      next(action);
      break;
    case DELETE_TRANSACTION:
      const { selectedWallet } = store.getState().portfolio;

      if (action.payload !== undefined) {
        privateRoute({
          method: 'delete',
          url: `/portfolio/transaction/${action.payload}`,
          headers: {
            Authorization: store.getState().user.accessToken,
          },
        })
          .then((res) => {
            if (res.status === 204) {
              store.dispatch(fetchSpecificWallet(selectedWallet));
              store.dispatch(toggleConfirmDelete());
              const newAccessToken = res.headers.authorization;
              store.dispatch(saveNewToken(newAccessToken));
            }
          })
          .catch((err) => {
            console.log(err.response);
            store.dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
          });
      }
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default portfolio;
