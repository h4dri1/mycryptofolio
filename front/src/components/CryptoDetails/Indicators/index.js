/* eslint-disable no-dupe-keys */
import PropTypes from 'prop-types';

import {
  Box, Typography, Chip, Divider, IconButton,
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

export default function Indicators({ data, favorite }) {
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const dispatch = useDispatch();

  if (data.market_data) {
    if (!data.market_data.fully_diluted_valuation.usd || !data.market_data.max_supply) {
      var fullyDilutedValuation = '--';
      var maxSupply = '--';
    }
    else {
      var fullyDilutedValuation = `${currency(data.market_data.fully_diluted_valuation[selectedCurrency.toLowerCase()], selectedCurrency)}`;
      var maxSupply = `${data.market_data.max_supply.toLocaleString()}`;
    }
  }

  const marketCap = data.market_data ? `${currency(data.market_data.market_cap[selectedCurrency.toLowerCase()], selectedCurrency)}` : 'Loading...';
  var fullyDilutedValuation = data.market_data ? fullyDilutedValuation : 'Loading...';
  const totalVolume = data.market_data ? `${currency(data.market_data.total_volume[selectedCurrency.toLowerCase()], selectedCurrency)}` : 'Loading...';
  const circulatingSupply = data.market_data ? `${data.market_data.circulating_supply.toLocaleString()}` : 'Loading...';
  var maxSupply = data.market_data ? maxSupply : 'Loading...';

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
      <Divider />
      <Box sx={{
        padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', marginTop: 4,
      }}
      >
        <PaidIcon fontSize="large" sx={{ color: 'primary.light' }} />
        <Typography sx={{ marginLeft: 1, color: 'primaryTextColor.main' }}>MarketCap : {marketCap}</Typography>
      </Box>
      <Box sx={{
        padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
      }}
      >
        <BatteryCharging90Icon fontSize="large" sx={{ color: 'primary.light' }} />
        <Typography sx={{ marginLeft: 1, color: 'primaryTextColor.main' }}>Fully diluted valuation : {fullyDilutedValuation}</Typography>
      </Box>
      <Box sx={{
        padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
      }}
      >
        <CurrencyExchangeIcon fontSize="large" sx={{ color: 'primary.light' }} />
        <Typography sx={{ marginLeft: 1, color: 'primaryTextColor.main' }}>24h Volume : {totalVolume}</Typography>
      </Box>
      <Box sx={{
        padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
      }}
      >
        <ChangeCircleIcon fontSize="large" sx={{ color: 'primary.light' }} />
        <Typography sx={{ marginLeft: 1, color: 'primaryTextColor.main' }}>Circulating supply : {circulatingSupply}</Typography>
      </Box>
      <Box sx={{
        padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center',
      }}
      >
        <FactoryIcon fontSize="large" sx={{ color: 'primary.light' }} />
        <Typography sx={{ marginLeft: 1, color: 'primaryTextColor.main' }}>Max supply : {maxSupply}</Typography>
      </Box>
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
        {favorite.cryptos.length > 0 && favorite.cryptos.some((e) => e.coin_id === data.id) ? (
          <IconButton color="secondary" value={data.id} onClick={() => dispatch(deleteFavoriteCrypto(data.id))}>
            <StarIcon sx={{ fontSize: '2em' }} />
          </IconButton>
        ) : (
          <IconButton color="secondary" value={data.id} onClick={() => dispatch(addFavoriteCrypto(data.id))}>
            <StarOutlineIcon sx={{ fontSize: '2em' }} />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};
