import {
    GET_CRYPTO_DESCRIPTION, GET_INDICATORS,
} from 'src/actions/cryptoDetails';

const initialState = {
    crypto: {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        description: {
            "en": "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>."
        },
        links: {
            homepage: [
                "http://www.bitcoin.org",
            ]
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
    }
}

const cryptoDetails = (state = initialState, action = {}) => {
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


        default:
            return state;
    }
};

export default cryptoDetails;