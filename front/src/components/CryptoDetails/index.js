/* eslint-disable react/jsx-no-useless-fragment */
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData, fetchChartData } from 'src/actions/cryptoDetails';
import Graph from './Graph';
import Description from './Description';
import Converter from './Converter';
import Indicators from './Indicators';
import Chip from '@mui/material/Chip';

import Loading from '../Loading';

const useStyles = makeStyles({
  grid: {
    marginTop: '20px',
    height: '100%',
    padding: 0
  },
  gridItem: {
    borderRadius: 2,
  },
});

function CryptoDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, chart, days } = useSelector((state) => state.cryptoDetails);
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const { slug } = useParams();

  const { darkMode } = useSelector((state) => state.settings);

  const [range, setRange] = React.useState(1);

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

  useEffect(() => {
      dispatch(fetchCryptoData(slug, range));
  }, []);

  const handleClick = (event) => {
    dispatch(fetchChartData(slug, event.target.value));
  }

  const handleChange = (event, newRange) => {
    if (newRange !== null) {
      setRange(newRange);
    }  
  }

  const currentPrice = data.market_data ? data.market_data.current_price[selectedCurrency.toLowerCase()].toLocaleString("en-US", curParams) : 0;
  const priceChange = data.market_data ? data.market_data.market_cap_change_percentage_24h : 0;

  return (
    <>
      <Loading/>
        <Box
          sx={{
            p: 1, borderRadius: 5, fontSize: '0.875rem', fontWeight: '700', margin: '0 auto 50px auto'
          }}
          container
          rowSpacing={{ xs: 1, md: 2 }}
          className={classes.grid}
        >
          <Grid container sx={{ justifyContent: 'center', display: 'flex', gridAutoFlow: 'row', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Box xs={11} sx={{backgroundColor: !darkMode ? '' : '#002F54', flex: 2, marginLeft: { xs: 1, lg: 1, xl: 6.5}, marginRight: { xs: 1, lg: 1,  xl: 6.5}, boxShadow: 4, borderRadius: '10px', padding: 2, minWidth: '55%'}}>
              <Box sx={{justifyContent: {xs: 'center', lg: 'space-between', xl: 'space-between'}, display: 'flex', flexWrap: 'wrap', marginTop: {xs: 0, lg: 2, xl: 2}, marginBottom: 2}}>
                <Box sx={{ marginBottom: {xs: 1}, display: 'flex'}}>
                  <Typography sx={{fontSize: '1.5rem', color: !darkMode ? 'primary.main' : '#07f3d5', mr: 1}}>{cryptoSym}{currentPrice}</Typography>
                  <Chip sx={{marginRight: 1}} color={priceChange < 0 ? 'secondary' : 'success'} label={`${Math.round(priceChange * 100) / 100}%`}/>
                </Box>
                <ToggleButtonGroup sx={{maxHeight: '30px'}} value={range} onChange={handleChange} variant="contained" exclusive aria-label="outlined primary button group">
                    <ToggleButton value={1} onClick={handleClick}>24h</ToggleButton>
                    <ToggleButton value={7} onClick={handleClick}>7d</ToggleButton>
                    <ToggleButton value={30} onClick={handleClick}>1m</ToggleButton>
                    <ToggleButton value={90} onClick={handleClick}>3m</ToggleButton>
                    <ToggleButton value={180} onClick={handleClick}>6m</ToggleButton>
                    <ToggleButton value={365} onClick={handleClick}>1a</ToggleButton>
                    <ToggleButton value={'max'} onClick={handleClick}>Max</ToggleButton>
                </ToggleButtonGroup>  
              </Box>
              <Graph 
                chart={chart}
                data={data}
              />
            </Box>
            <Box xs={11} sx={{backgroundColor: !darkMode ? '' : '#002F54', boxShadow: 4, borderRadius: '10px', padding: 2,  marginRight: {xs: 1, lg: 1, xl: 6.5}, marginTop: {xs: 4, md: 0, lg: 0, xl: 0}, marginLeft: {xs: 1, lg: 1, xl: 0}}}>
              <Indicators
                data={data}
              />
            </Box>
            <Box xs={11} sx={{backgroundColor: !darkMode ? '' : '#002F54', marginTop: 4, marginLeft: {xs: 1, xl: 6.5}, marginRight: {xs: 1, xl: 6.5}, boxShadow: 4, borderRadius: '10px', padding: 2, width: 1}}>
              <Description
                sx={{ gridAutoRows: '100px' }}
                data={data}
              />
            </Box>
          </Grid>
        </Box>
    </>
  );
}

export default CryptoDetails;
