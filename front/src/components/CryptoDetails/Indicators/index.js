/* eslint-disable no-dupe-keys */
import PropTypes from 'prop-types';

import { Box, Typography, Chip, Divider } from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FactoryIcon from '@mui/icons-material/Factory';

import { useDispatch, useSelector } from 'react-redux';

export default function Indicators({ data }) {
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const { loading } = useSelector((state) => state.cryptoDetails);

  if (selectedCurrency === 'BTC') {
    var curParams = {
      maximumSignificantDigits: 4
    }
    var cryptoSym = '₿'
  } else if (selectedCurrency === 'ETH') {
    var curParams = {
      maximumSignificantDigits: 4
    }
    var cryptoSym = 'Ξ'
  } else {
    var curParams = {
      style: "currency",
      currency: selectedCurrency,
      maximumSignificantDigits: 4
    }
    var cryptoSym = ''
  }

if (data.market_data) {

  if (!data.market_data.fully_diluted_valuation.usd || !data.market_data.max_supply) {
    var fullyDilutedValuation = '--'
    var maxSupply = '--'
  } else {
    var fullyDilutedValuation = `${cryptoSym}${data.market_data.fully_diluted_valuation[selectedCurrency.toLowerCase()].toLocaleString("en-US", curParams)}`
    var maxSupply = `${cryptoSym}${data.market_data.max_supply.toLocaleString()}`
  }
}

  const marketCap = data.market_data ? `${cryptoSym}${data.market_data.market_cap[selectedCurrency.toLowerCase()].toLocaleString("en-US", curParams)}` : 'Loading...';
  var fullyDilutedValuation = data.market_data ? fullyDilutedValuation : 'Loading...';
  const totalVolume = data.market_data ? `${cryptoSym}${data.market_data.total_volume[selectedCurrency.toLowerCase()].toLocaleString("en-US", curParams)}` : 'Loading...';
  const circulatingSupply = data.market_data ? `${cryptoSym}${data.market_data.circulating_supply.toLocaleString()}` : 'Loading...';
  var maxSupply = data.market_data ? maxSupply : 'Loading...';

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('darkmode')
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '380px', justifyContent: 'left'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', minWidth: '100%', justifyContent: 'center'}}> 
          <Box>
              <img
                src={data.image ? `${data.image.small}?w=248&fit=crop&auto=format` : 'https://via.placeholder.com/24x24?text=No+Image'}
                //   srcSet={`${data.image.thumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={`logo ${data.id}`}
                loading="lazy"
              />
          </Box>
          <Box sx={{ fontSize: '2em', marginLeft: 1}}>{data.name}</Box>
        </Box>
        <Divider/>
        <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center', marginTop: 4 }}>
          <PaidIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
          <Typography sx={{marginLeft: 1}}>MarketCap : {marketCap}</Typography>
        </Box>
        <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
          <BatteryCharging90Icon fontSize='large' sx={{ color: 'primary.dark' }}/>
          <Typography sx={{marginLeft: 1}}>Fully diluted valuation : {fullyDilutedValuation}</Typography>
        </Box>
        <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
          <CurrencyExchangeIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
          <Typography sx={{marginLeft: 1}}>24h Volume : {totalVolume}</Typography>
        </Box>
        <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
          <ChangeCircleIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
          <Typography sx={{marginLeft: 1}}>Circulating supply : {circulatingSupply}</Typography>
        </Box>
        <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
          <FactoryIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
          <Typography sx={{marginLeft: 1}}>Max supply : {maxSupply}</Typography>
        </Box>
        <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
          <Chip sx={{marginRight: 1}} color='secondary' label="Website" component="a" href={data.links ? data.links : '#'} clickable/>
          <Chip sx={{marginLeft: 1}} color='secondary' label="GitHub" component="a" href={data.repos_url ? data.repos_url[0] : '#'} clickable/>
        </Box>
      </Box>
    </>
  );
}

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};
