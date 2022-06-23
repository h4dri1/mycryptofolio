/* eslint-disable react/function-component-definition */
import * as React from 'react';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { deleteUser } from '../../actions/user';

import Loading from '../Loading';

import { setDisplaySnackBar } from 'src/actions/settings';

import { getCryptoTrend, getNFTTrend, getFearGreedIndex } from '../../actions/cryptos';

import {
    Grid,
    Link
  } from '@mui/material';

import { makeStyles } from '@mui/styles';
import TopFlop from './TopFlop'
import News from './News'
import TopNFT from './TopNFT'

const useStyles = makeStyles({
    grid: {
      marginTop: '110px'
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

  const navigate = useNavigate();

  useEffect(() => { 
    dispatch(getCryptoTrend());
    dispatch(getNFTTrend());
    dispatch(getFearGreedIndex());
  }, []);

    return (

        <Grid
            container
            display={'flex'}
            direction={'column'}
            alignItems={'center'}
            className={classes.grid}
        >
            <Loading />
            <Grid className={classes.gridItem}>
              <TopFlop/>
              <News/>
              <TopNFT/>
            </Grid>
        </Grid >
    );
}
