import {
    GET_CRYPTO_DESCRIPTION, GET_INDICATORS, FETCH_CRYPTO_DATA
} from 'src/actions/cryptoDetails';

const initialState = {
    data: {
        id: "Bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        description: {
            en: "test"
        },
        links: {
            homepage: []
        },
        repos_url: {
            github: [
                "https://github.com/bitcoin/bitcoin",
                "https://github.com/bitcoin/bips"
            ]
        },
        image: {
            thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
            small: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
            large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
        },
        market_data: {
            current_price: {
                btc: 1,
                eth: 14.538752,
                eur: 33711,
                usd: 37792
            },
            market_cap: {
                btc: 18945006,
                eth: 275307266,
                eur: 639284443858,
                usd: 716700255339
            },
            total_volume: {
                btc: 409082,
                eth: 5944961,
                eur: 13784662286,
                usd: 15453345433
            },
            market_cap_rank: 1,
            market_cap_change_percentage_24h: -0.5565,
            total_supply: 21000000,
            max_supply: 21000000,
            circulating_supply: 18945006,
            last_updated: "2022-01-31T16:05:49.847Z"
        }
    },
    chart: {
        prices: [
            [],
        ],
        market_caps: [
            []
        ],
        total_volumes: [
            []
        ],
    }
}

const cryptoDetailsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_CRYPTO_DESCRIPTION:
            return {
                ...state,
                description: action.payload,
            };
        case GET_INDICATORS:
            return {
                ...state,
                market_data: action.payload,
            };
        case FETCH_CRYPTO_DATA:
            return {
                ...state,
                id: action.payload

            };

        default:
            return state;
    }
};

export default cryptoDetailsReducer;