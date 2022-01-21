import axios from 'axios';

import { GET_CRYPTO_LIST, updateCryptoList, GET_MORE_CRYPTOS, updateCryptoQuantity, getCryptoList } from 'src/actions/cryptos';
import cryptos from 'src/components/CryptoList/cryptos.json';

const cryptoList = (store) => (next) => (action) => {
    switch (action.type) {
        case GET_CRYPTO_LIST:
            store.dispatch(updateCryptoList(cryptos));

            // const { cryptoList } = store.getState().cryptos;
            // console.log(cryptoList.quantity);

            // axios({
            //     method: 'get',
            //     url: 'https://dev.mycryptofolio.fr/v1/NOM_A_DEFINIR',
            //     data: {
            //         quantity: cryptoList.quantity,
            //     },
            // })
            //     .then((res) => {
            //         console.log(res.data);
            //         store.dispatch(updateCryptoList(res.data));
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     })

            break
        case GET_MORE_CRYPTOS:
            store.dispatch(updateCryptoQuantity());
            store.dispatch(getCryptoList());
        default:
            next(action);
            break;
    }
};

export default cryptoList;
