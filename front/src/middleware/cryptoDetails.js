import axios from 'axios';

import { FETCH_CRYPTO_DATA, fetchCryptoData } from 'src/actions/cryptoDetails';
// import { getCryptoData } from '../actions/cryptoDetails';

const cryptoDetails = (store) => (next) => (action) => {
    switch (action.type) {
        case FETCH_CRYPTO_DATA:
            store.dispatch(fetchCryptoData());
            console.log(fetchCryptoData);

            axios({
                method: 'get',
                url: `https://dev.mycryptofolio.fr/v1/crypto/${slug}`,
            })
                .then((res) => {
                    store.dispatch(fetchCryptoData(res.data));
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
