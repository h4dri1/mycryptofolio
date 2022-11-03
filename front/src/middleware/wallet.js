import axios from 'axios';
import {
  GET_WALLET_ENS,
  updateWalletENS,
  GET_WALLET_TOKENS,
  updateWalletTokens,
  GET_WALLET_NFT,
  updateWalletNFT,
  GET_WALLET_HISTORY,
  updateWalletHistory,
} from '../actions/wallet';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const wallet = (store) => (next) => async (action) => {
  const state = store.getState();

  const { walletAddress, walletNetwork, walletBalance } = state.wallet;

  switch (action.type) {
    case GET_WALLET_ENS:
      if (Number(walletNetwork) === 1) {
        axios({
          method: 'get',
          baseURL,
          url: `/ens/${walletAddress}`,
        })
          .then(async (res) => {
            const wallets = JSON.parse(localStorage.getItem('wallets'));
            const wallet = wallets.find((w) => w.address === walletAddress);
            if (!wallet.name) {
              const newWallets = wallets.map((w) => {
                if (w.address === walletAddress) {
                  w.name = res.data.name;
                }
                return w;
              });
              localStorage.setItem('wallets', JSON.stringify(newWallets));
            }
            localStorage.setItem('walletENS', res.data.name);
            await store.dispatch(updateWalletENS(res.data.name));
          }).catch((err) => {
            console.log(err);
          });
      }
      next(action);
      break;
    case GET_WALLET_TOKENS:
      var { selectedCurrency } = store.getState().cryptos.cryptoList;
      axios({
        method: 'get',
        baseURL,
        url: `/token/${walletAddress}/${selectedCurrency.toLowerCase()}/${walletBalance}/${walletNetwork}`,
      })
        .then(async (res) => {
          await store.dispatch(updateWalletTokens(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
      next(action);
      break;
    case GET_WALLET_NFT:
      axios({
        method: 'get',
        baseURL,
        url: `/nft/${walletAddress}/${walletNetwork}`,
      })
        .then(async (res) => {
          await store.dispatch(updateWalletNFT(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
      next(action);
    case GET_WALLET_HISTORY:
      axios({
        method: 'get',
        baseURL,
        url: `/tokens/history/${walletAddress}`,
      })
        .then(async (res) => {
          await store.dispatch(updateWalletHistory(res.data));
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

export default wallet;
