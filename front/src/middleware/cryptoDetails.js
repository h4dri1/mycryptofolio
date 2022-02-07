import axios from 'axios';

import { FETCH_CRYPTO_DATA } from 'src/actions/cryptoDetails';
import { fetchCryptoDataSuccess } from '../actions/cryptoDetails';
// import { getCryptoData } from '../actions/cryptoDetails';

const cryptoDetails = (store) => (next) => (action) => {
    switch (action.type) {
        case FETCH_CRYPTO_DATA:
            axios({
                method: 'get',
                url: `https://api.mycryptofolio.fr/v1/crypto/${action.payload}`,
            })
                .then((res) => {
                    console.log(res.data);
                    // fetchCryptoDataSuccess(res.data)
                    store.dispatch(fetchCryptoDataSuccess(res.data));
                })
                .catch((err) => console.log(err));

            next(action);
            break;

        default:
            next(action);
            break;
    }
};

export default cryptoDetails;
