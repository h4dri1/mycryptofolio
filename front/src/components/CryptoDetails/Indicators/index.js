/* eslint-disable no-dupe-keys */
import PropTypes from 'prop-types';

import { Box, Typography, Chip, Divider } from '@mui/material';

import PaidIcon from '@mui/icons-material/Paid';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FactoryIcon from '@mui/icons-material/Factory';

export default function Indicators({ data }) {
  const lastUpdateDate = new Date(data.market_data.last_updated);

  return (
    <Box >
      <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Box>
          <img
            src={`${data.image.small}?w=248&fit=crop&auto=format`}
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
        <Typography sx={{marginLeft: 1}}>MarketCap : ${data.market_data.market_cap.usd}</Typography>
      </Box>
      <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
        <BatteryCharging90Icon fontSize='large' sx={{ color: 'primary.dark' }}/>
        <Typography sx={{marginLeft: 1}}>Fully diluted valuation : ${data.market_data.fully_diluted_valuation}</Typography>
      </Box>
      <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
        <CurrencyExchangeIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
        <Typography sx={{marginLeft: 1}}>24h Volume : ${data.market_data.total_volume.usd}</Typography>
      </Box>
      <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
        <ChangeCircleIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
        <Typography sx={{marginLeft: 1}}>Circulating supply : {data.market_data.circulating_supply}</Typography>
      </Box>
      <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
        <FactoryIcon fontSize='large' sx={{ color: 'primary.dark' }}/>
        <Typography sx={{marginLeft: 1}}>Max supply : {data.market_data.max_supply}</Typography>
      </Box>
      <Box sx={{ padding: '.5em 1em', display: 'flex', minHeight: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4 }}>
        <Chip sx={{marginRight: 1}} color='secondary' label="Website" component="a" href={data.links} clickable/>
        <Chip sx={{marginLeft: 1}} color='secondary' label="GitHub" component="a" href={data.repos_url[0]} clickable/>
      </Box>
      
    </Box>

  );
}

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};
