import axios from 'axios';

import { GET_CRYPTO_LIST, updateCryptoList } from 'src/actions/cryptos';
import cryptos from 'src/components/CryptoList/cryptos.json';

const cryptoList = (store) => (next) => (action) => {
    switch (action.type) {
        case GET_CRYPTO_LIST:
            console.log("here");
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
    
        default:
            break;
    }
};

export default cryptoList;
