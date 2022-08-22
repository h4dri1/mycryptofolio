/* eslint-disable react/function-component-definition */

import React, { Suspense, lazy } from 'react';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getCryptoTrend, getFearGreedIndex } from '../../actions/cryptos';

import { getNFTList, resetNFTQuantity } from '../../actions/nft';

import Loading from '../Loading'


import { Grid } from '@mui/material';

import { makeStyles } from '@mui/styles';
//import TopFlop from './TopFlop'
//import News from './News'
//import TopNFT from './TopNFT'
//import CryptoList from '../CryptoList'

const TopFlop = lazy(() => import('./TopFlop'))
const News = lazy(() => import('./News'))
const TopNFT = lazy(() => import('./TopNFT'))
const CryptoList = lazy(() => import('../CryptoList'))

const useStyles = makeStyles({
    grid: {
      justifyContent: 'center',
      marginTop: '20px'
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: 2,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    gridSubItem: {
      border: 'solid 2px gold',
      height: '100%',
    },
  });


export default function Info() {

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(resetNFTQuantity())
    dispatch(getCryptoTrend());
    dispatch(getFearGreedIndex());
    dispatch(getNFTList());
  }, []);

    return (

        <Grid
            container
            className={classes.grid}  
        >
            <Grid item className={classes.gridItem}>
              <Suspense fallback={<Loading/>}>
                <TopFlop/>
                <News/>
                <TopNFT/>
              </Suspense>
            </Grid>
            <Suspense fallback={<Loading/>}>
              <CryptoList/>
            </Suspense>
        </Grid >
    );
}
