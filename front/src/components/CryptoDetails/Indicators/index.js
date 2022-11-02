/* eslint-disable max-len */
/* eslint-disable no-dupe-keys */
import PropTypes from 'prop-types';

import {
  Box, Typography, Chip, Divider, IconButton, Skeleton,
} from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FactoryIcon from '@mui/icons-material/Factory';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFavoriteCrypto, addFavoriteCrypto } from '../../../actions/favorite';
import currency from '../../../services/curFormatter';

const formatValue = (data, selectedCurrency) => {
  if (data.market_data) {
    const fullyDilutedValuation = !data.market_data.fully_diluted_valuation.usd
      ? '--'
      : currency(data.market_data.fully_diluted_valuation[selectedCurrency.toLowerCase()], selectedCurrency);
    const maxSupply = !data.market_data.max_supply ? '--' : data.market_data.max_supply.toLocaleString();
    const totalVolume = currency(data.market_data.total_volume[selectedCurrency.toLowerCase()], selectedCurrency);
    const circulatingSupply = data.market_data.circulating_supply.toLocaleString();
    const marketCap = currency(data.market_data.market_cap[selectedCurrency.toLowerCase()], selectedCurrency);
    return {
      fullyDilutedValuation,
      maxSupply,
      totalVolume,
      circulatingSupply,
      marketCap,
    };
  }
  return null;
};

function IndicatorBox(props) {
  const {
    data, value, children, name,
  } = props;
  return (
    <Box sx={{
      padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
    }}
    >
      {children}
      <Typography sx={{ marginLeft: 1, color: 'primaryTextColor.main' }}>{name} : { data.market_data ? value : 'Loading...'}</Typography>
    </Box>
  );
}

export default function Indicators({ data, favorite }) {
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const { logged } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'left',
    }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        minWidth: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Box>
          <img
            src={data.image ? `${data.image.small}?w=248&fit=crop&auto=format` : 'https://via.placeholder.com/24x24?text=No+Image'}
                //   srcSet={`${data.image.thumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={`logo ${data.id}`}
            loading="lazy"
          />
        </Box>
        <Box sx={{ fontSize: '2em', marginLeft: 1, color: 'secondary.dark' }}>{data.name}</Box>
      </Box>
      <Divider sx={{ marginBottom: 4 }} />
      <IndicatorBox data={data} value={formatValue(data, selectedCurrency)?.marketCap} name="Market Cap">
        <PaidIcon fontSize="large" sx={{ color: 'primary.light' }} />
      </IndicatorBox>
      <IndicatorBox data={data} value={formatValue(data, selectedCurrency)?.fullyDilutedValuation} name="Fully diluted Valuation">
        <BatteryCharging90Icon fontSize="large" sx={{ color: 'primary.light' }} />
      </IndicatorBox>
      <IndicatorBox data={data} value={formatValue(data, selectedCurrency)?.totalVolume} name="Total Volume">
        <CurrencyExchangeIcon fontSize="large" sx={{ color: 'primary.light' }} />
      </IndicatorBox>
      <IndicatorBox data={data} value={formatValue(data, selectedCurrency)?.circulatingSupply} name="Circulating Supply">
        <ChangeCircleIcon fontSize="large" sx={{ color: 'primary.light' }} />
      </IndicatorBox>
      <IndicatorBox data={data} value={formatValue(data, selectedCurrency)?.maxSupply} name="Max Supply">
        <FactoryIcon fontSize="large" sx={{ color: 'primary.light' }} />
      </IndicatorBox>
      <Box sx={{
        padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4,
      }}
      >
        <Chip color="secondary" label="Website" component="a" href={data.links ? data.links : '#'} clickable />
        <Chip sx={{ marginLeft: 1 }} color="secondary" label="GitHub" component="a" href={data.repos_url ? data.repos_url[0] : '#'} clickable />
        <Chip sx={{ marginLeft: 1 }} color="secondary" label="Explorer" component="a" href={data.explorer ? data.explorer : '#'} clickable />
      </Box>
      <Box sx={{
        display: 'flex', color: 'secondary.dark', width: '100%', justifyContent: 'center', mt: 3,
      }}
      >
        { logged && (
          favorite.cryptos.length > 0 && favorite.cryptos.some((e) => e.coin_id === data.id) ? (
            <IconButton color="secondary" value={data.id} onClick={() => dispatch(deleteFavoriteCrypto(data.id))}>
              <StarIcon sx={{ fontSize: '2em' }} />
            </IconButton>
          ) : (
            <IconButton color="secondary" value={data.id} onClick={() => dispatch(addFavoriteCrypto(data.id))}>
              <StarOutlineIcon sx={{ fontSize: '2em' }} />
            </IconButton>
          )
        )}
      </Box>
    </Box>
  );
}

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};
