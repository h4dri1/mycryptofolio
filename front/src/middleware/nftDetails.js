import axios from 'axios';

import { FETCH_NFT_DATA, fetchNFTDataSuccess } from 'src/actions/nftDetails';

import { setDisplaySnackBar } from 'src/actions/settings';

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
          if (res.data.status === 'Not Found') {
            store.dispatch(setDisplaySnackBar({ severity: 'error', message: `Erreur lors de la récupération des informations` }));
          }
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
