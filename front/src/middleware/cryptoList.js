import axios from 'axios';

import { GET_CRYPTO_LIST, updateCryptoList, GET_MORE_CRYPTOS, getMoreCryptosLoading, updateCryptoQuantity, getCryptoList } from 'src/actions/cryptos';

const cryptoList = (store) => (next) => (action) => {
    switch (action.type) {
        case GET_CRYPTO_LIST:
            const { selectedCurrency, quantity } = store.getState().cryptos.cryptoList;

            axios({
                method: 'get',
                url: `https://dev.mycryptofolio.fr/v1/cryptos/${selectedCurrency}/${quantity}`,
            })
                .then((res) => {
                    store.dispatch(updateCryptoList(res.data));
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    if (store.getState().cryptos.cryptoList.cryptoListLoading) {
                        store.dispatch(getMoreCryptosLoading());
                    }
                })
            break
        case GET_MORE_CRYPTOS:
            store.dispatch(getMoreCryptosLoading());
            store.dispatch(updateCryptoQuantity());
            store.dispatch(getCryptoList());
        default:
            next(action);
            break;
    }
};

export default cryptoList;