import axios from 'axios';

import { FETCH_NFT_DATA, fetchNFTDataSuccess } from 'src/actions/nftDetails';

import { setPending } from 'src/actions/settings';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const nftDetails = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_NFT_DATA:
      store.dispatch(setPending())
      axios({
        method: 'get',
        baseURL,
        url: `/nft/collections/${action.payload}`,
      })
        .then((res) => {
          store.dispatch(fetchNFTDataSuccess(res.data));
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

export default nftDetails;
