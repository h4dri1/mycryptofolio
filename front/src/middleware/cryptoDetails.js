import axios from 'axios';

import { GET_CRYPTO_DATA } from 'src/actions/cryptoDetails';
// import { getCryptoData } from '../actions/cryptoDetails';

const cryptoDetails = (store) => (next) => (action) => {
    switch (action.type) {
        case GET_CRYPTO_DATA:
            store.dispatch(getCryptoData());
            console.log(getCryptoData);

            axios({
                method: 'get',
                url: 'https://dev.mycryptofolio.fr/v1/crypto/Ethereum',
            })
                .then((res) => {
                    store.dispatch(getCryptoData(res.data));
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
