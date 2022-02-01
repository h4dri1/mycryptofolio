import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIndicators } from 'src/actions/cryptoDetails';

export default function Indicators() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIndicators());
    }, []);

    const { market_data } = useSelector((state) => state.cryptoDetails.crypto);
    // console.log(market_data);

    return (
        <div className="">
            {/* <p>Prix actuel:{market_data.current_price.`${slug}`}</p> */}
            {/* <p>Market cap.:{market_data.market_cap.`${slug}`}</p> */}
            {/* <p>Total volume:{market_data.total_volume.`${slug}`}</p> */}
            <p>Rang Market cap.:{market_data.market_cap_rank}</p>
            <p>% market cap. 24h:{market_data.market_cap_change_percentage_24h}</p>
            <p>Total supply: {market_data.total_supply}</p>
            <p>Max supply: {market_data.max_supply}</p>
            <p>Circulating supply:{market_data.circulating_supply}</p>
            <p>Dernière mise à jour:{market_data.last_updated}</p>
        </div >
    );
}
