/* eslint-disable react/function-component-definition */
import { Typography, Container, Box, Skeleton }  from '@mui/material';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PercentIcon from '@mui/icons-material/Percent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { getIndicators } from '../../../actions/indicators';

import { useEffect } from 'react';

// const useStyles = makeStyles((theme) => ({
//   indicator: {
//     display: 'flex',
//     ,

//     alignItems: 'center',
//     [theme.breakpoints.up('md')]: {
//       margin: '0 2em',
//     },
//   },
// }));

const Indicators = ({ data }) => {
  const dispatch = useDispatch();
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);

  useEffect(() => {
    dispatch(getIndicators());
  }, []);

  return (
    <Container
      disableGutters
      sx={{
        maxWidth: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        ml: 0.5,
        fontSize: '0.8rem',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }}
    >
      <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: 'center' }, marginRight: { xs: '1.5em', md: '3em' } }}>
      <MonetizationOnIcon sx={{ color: 'secondary.dark' }}/>
        <Typography
          variant="subtitle"
          component="p"
          sx={{ marginLeft: '0.5em', fontWeight: 'bold' }}
        >
          Total Market Cap. :
        </Typography>
        <Typography
          sx={{
            ml: 0.8,
            color: 'secondary.main',
            fontSize: '0.8rem',
          }}
        >

          {
            Object.keys(data.total_market_cap).length !== 0 ?
            Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: refCurrency,
              maximumSignificantDigits: 4,
              minimumSignificantDigits: 2,
            }).format(data.total_market_cap[refCurrency.toLowerCase()]) :
            (<Skeleton sx={{borderRadius: '10px'}} variant="rectangle" width='50px' height='15px' />)
          }

        </Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: 'center' }, marginRight: { xs: '1.5em', md: '3em' } }}>
      <CurrencyExchangeIcon sx={{ color: 'secondary.dark' }} />
        <Typography
          variant="subtitle"
          sx={{ marginLeft: '0.5em', fontWeight: 'bold' }}
        >
          24h Vol :
        </Typography>
        <Typography
          sx={{
            ml: 0.8,
            color: 'secondary.main',
            fontSize: '0.8rem',
          }}
        >
          {
            Object.keys(data.total_volume).length !== 0 ?
          Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: refCurrency,
              maximumSignificantDigits: 4,
              minimumSignificantDigits: 2,
            }).format(data.total_volume[refCurrency.toLowerCase()]) :
            (<Skeleton sx={{borderRadius: '10px'}} variant="rectangle" width='50px' height='15px' />)
          }

        </Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: 'center' }, marginRight: { xs: '1.5em', md: '3em' } }}>
        <PercentIcon sx={{ color: 'secondary.dark' }} />
        <Typography
          variant="subtitle"
          component="p"
          sx={{ marginLeft: '0.5em', fontWeight: 'bold' }}
        >
          Dominance BTC:
        </Typography>
        <Typography
          sx={{
            ml: 0.8,
            color: 'secondary.main',
            fontSize: '0.8rem',
          }}
        >
          {
            Object.keys(data.market_cap_percentage).length !== 0 ?
            Intl.NumberFormat('en-US', {
              //style: 'percent',
              maximumSignificantDigits: 4,
              minimumSignificantDigits: 2,
            }).format(data.market_cap_percentage.btc) :
            (<Skeleton sx={{borderRadius: '10px'}} variant="rectangle" width='50px' height='15px' />)}
        </Typography>
      </Box>
    </Container>
  )
};

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Indicators;
