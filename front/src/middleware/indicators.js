/* eslint-disable no-case-declarations */
import axios from 'axios';

import { GET_INDICATORS, getIndicatorsSuccess } from 'src/actions/indicators';

const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

const indicators = (store) => (next) => (action) => {

    switch (action.type) {
        case GET_INDICATORS:
            axios({
                method: 'get',
                baseURL,
                url: '/global',
            })
                .then((res) => {
                    const { total_market_cap, total_volume, market_cap_percentage } = res.data.data;
                    store.dispatch(getIndicatorsSuccess({ total_market_cap, total_volume, market_cap_percentage }));
                })
                .catch((err) => console.log('error', err));
            next(action);
            break;

        default:
            next(action);
            break;
    }

};

export default indicators;
