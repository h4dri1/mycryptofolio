/* eslint-disable no-case-declarations */
import axios from 'axios';

import {
  GET_NFT_LIST,
  updateNFTList,
  GET_MORE_NFT,
  getMoreNFTLoading,
  getNFTList,
  updateNFTQuantity
} from 'src/actions/nft';

import { setPending } from 'src/actions/settings';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const NFTList = (store) => (next) => (action) => {
  switch (action.type) {
    
    case GET_NFT_LIST:
      store.dispatch(setPending())
      const { selectedCurrency, quantity } = store.getState().nft.NFTList;

      axios({
        method: 'get',
        baseURL,
        url: `/nft/top/${quantity}`,
      })
        .then((res) => {
          store.dispatch(updateNFTList(res.data));
          store.dispatch(setPending())
        })
        .catch((err) => {
          store.dispatch(setPending())
          console.log(err);
        })
        .finally(() => {
          if (store.getState().nft.NFTList.NFTListLoading) {
            store.dispatch(getMoreNFTLoading());
          }
        });
      next(action);
      break;
    case GET_MORE_NFT:
      store.dispatch(getMoreNFTLoading());
      store.dispatch(updateNFTQuantity());
      store.dispatch(getNFTList());
      next(action);
      break;
    default:
      next(action);
      break;
  }
};

export default NFTList;
