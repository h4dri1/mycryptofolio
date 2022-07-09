/* eslint-disable react/jsx-no-useless-fragment */
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ButtonGroup, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoData } from 'src/actions/cryptoDetails';
import Graph from './Graph';
import Description from './Description';
import Converter from './Converter';
import Indicators from './Indicators';

import { useState } from 'react';

import Loading from '../Loading';

import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { daysInWeek } from 'date-fns/esm';

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

  const { data, chart, loading, days } = useSelector((state) => state.cryptoDetails);
  const { slug } = useParams();

  const [ disable, setDisable ] = useState(true);
  const [ disable1, setDisable1 ] = useState(false);
  const [ disable2, setDisable2 ] = useState(false);
  const [ disable3, setDisable3 ] = useState(false);
  const [ disable4, setDisable4 ] = useState(false);
  const [ disable5, setDisable5 ] = useState(false);
  const [ disable6, setDisable6 ] = useState(false);

  useEffect(() => {
    dispatch(fetchCryptoData(slug, days));
  }, []);

  const handleClick = (event) => {
    dispatch(fetchCryptoData(slug, event.target.value));
    if (event.target.value === '1') {
      setDisable(true);
      setDisable1(false);
      setDisable2(false);
      setDisable3(false);
      setDisable4(false);
      setDisable5(false);
      setDisable6(false);
    } else if (event.target.value === '7') {
      setDisable1(true);
      setDisable(false);
      setDisable2(false);
      setDisable3(false);
      setDisable4(false);
      setDisable5(false);
      setDisable6(false);
    } else if (event.target.value === '30') {
      setDisable1(false);
      setDisable(false);
      setDisable2(true);
      setDisable3(false);
      setDisable4(false);
      setDisable5(false);
      setDisable6(false);
    } else if (event.target.value === '90') {
      setDisable1(false);
      setDisable(false);
      setDisable2(false);
      setDisable3(true);
      setDisable4(false);
      setDisable5(false);
      setDisable6(false);
    } else if (event.target.value === '180') {
      setDisable1(false);
      setDisable(false);
      setDisable2(false);
      setDisable3(false);
      setDisable4(true);
      setDisable5(false);
      setDisable6(false);
    } else if (event.target.value === '365') {
      setDisable1(false);
      setDisable(false);
      setDisable2(false);
      setDisable3(false);
      setDisable4(false);
      setDisable5(true);
      setDisable6(false);
    } else if (event.target.value === 'max') {
      setDisable1(false);
      setDisable(false);
      setDisable2(false);
      setDisable3(false);
      setDisable4(false);
      setDisable5(false);
      setDisable6(true);
    }
  }

  return (
    <>
      <Loading />
      {!loading && (
        <Box
          sx={{
            p: 1, borderRadius: 5, fontSize: '0.875rem', fontWeight: '700', margin: '0 auto 50px auto'
          }}
          container
          rowSpacing={{ xs: 1, md: 2 }}
          className={classes.grid}
        >
          
          <Grid container sx={{ justifyContent: 'space-between', display: 'flex', gridAutoFlow: 'row', flexDirection: 'row', flexWrap: 'wrap' }}>
            <Box xs={11} sx={{ marginLeft: 6.5, boxShadow: 4, borderRadius: '10px', padding: 2, width: '72%'}}>
              <Box sx={{justifyContent: 'space-between', display: 'flex', marginTop: 2, marginBottom: 2, height: '30px', width: '100%'}}>
              <Box><Typography sx={{fontSize: '1.5rem', color: 'primary.main'}}>${data.market_data.current_price.usd}</Typography></Box>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button disabled={disable} value={1} onClick={handleClick}>24h</Button>
                  <Button disabled={disable1} value={7} onClick={handleClick}>7d</Button>
                  <Button disabled={disable2} value={30} onClick={handleClick}>1m</Button>
                  <Button disabled={disable3} value={90} onClick={handleClick}>3m</Button>
                  <Button disabled={disable4} value={180} onClick={handleClick}>6m</Button>
                  <Button disabled={disable5} value={365} onClick={handleClick}>1a</Button>
                  <Button disabled={disable6} value={'max'} onClick={handleClick}>Max</Button>
                </ButtonGroup>
                
              </Box>
              <Graph
                chart={chart}
                data={data}
              />
            </Box>
            <Box xs={11} sx={{boxShadow: 4, borderRadius: '10px', padding: 2,  marginRight: 6.5}}>
              <Indicators
                data={data}
              />
            </Box>
            <Box xs={11} sx={{marginTop: 4, marginLeft: 6.5, marginRight: 6.5, boxShadow: 4, borderRadius: '10px', padding: 2, width: 1}}>
              <Description
                sx={{ gridAutoRows: '100px' }}
                data={data}
              />
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default CryptoDetails;
