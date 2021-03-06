/* eslint-disable react/function-component-definition */
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PercentIcon from '@mui/icons-material/Percent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import { useMediaQuery } from '@mui/material';
import { getIndicators } from '../../../actions/indicators';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';


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
  const hideButton = useMediaQuery('(min-width:1000px)');

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
        {hideButton && <Typography
          variant="subtitle"
          component="p"
          sx={{ marginLeft: '0.5em', fontWeight: 'bold' }}
        >
          Total Market Cap. :
        </Typography>}
        <Typography
          sx={{
            ml: 0.8,
            color: 'secondary.main',
            fontSize: '0.8rem',
          }}
        >
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: refCurrency,
            maximumSignificantDigits: 4,
            minimumSignificantDigits: 2,
          }).format(data.total_market_cap[refCurrency.toLowerCase()])}

        </Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: 'center' }, marginRight: { xs: '1.5em', md: '3em' } }}>
      <CurrencyExchangeIcon sx={{ color: 'secondary.dark' }} />
        {hideButton && <Typography
          variant="subtitle"
          sx={{ marginLeft: '0.5em', fontWeight: 'bold' }}
        >
          24h Vol :
        </Typography>}
        <Typography
          sx={{
            ml: 0.8,
            color: 'secondary.main',
            fontSize: '0.8rem',
          }}
        >
          {Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: refCurrency,
            maximumSignificantDigits: 4,
            minimumSignificantDigits: 2,
          }).format(data.total_volume[refCurrency.toLowerCase()])}

        </Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'flex', alignItems: 'center' }, marginRight: { xs: '1.5em', md: '3em' } }}>
        <PercentIcon sx={{ color: 'secondary.dark' }} />
        {hideButton && <Typography
          variant="subtitle"
          component="p"
          sx={{ marginLeft: '0.5em', fontWeight: 'bold' }}
        >
          Dominance BTC:
        </Typography>}
        <Typography
          sx={{
            ml: 0.8,
            color: 'secondary.main',
            fontSize: '0.8rem',
          }}
        >
          {Intl.NumberFormat('en-US', {
            // style: 'percent',
            maximumSignificantDigits: 4,
            minimumSignificantDigits: 2,
          }).format(data.market_cap_percentage.btc)}%
        </Typography>
      </Box>
    </Container>
  )
};

Indicators.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Indicators;
