/* eslint-disable react/function-component-definition */
import { makeStyles } from '@mui/styles';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import colors from '../../services/getColors'

import AssetsShares from './AssetsShares';
import Nft from './Nft';
import Banner from './Banner';

import { getCurrentAccount } from '../../actions/metamask';

import HistoryToken from './HistoryToken';


const Wallet = () => {
  

  const useStyles = makeStyles({
    grid: {
      height: '100%',
      marginTop: '20px',
      marginBottom: '50px',
    },
    gridItem: {
      width: '95%',
      borderColor: '#E7EBF0',
      borderRadius: '10px',
      margin: '10px',
      boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
    },
    gridSubItem: {
      // border: 'solid 2px gold',
      // height: '100%',
    }
  });

  const { color } = colors()
  
  const classes = useStyles();
  const dispatch = useDispatch();

  const { walletTokens, walletAddress, walletNFT, walletHistory } = useSelector((state) => state.wallet);

  useEffect(() => {
      if (walletAddress !== 'Wallet') {
        dispatch(getCurrentAccount())
      }
  },[]);

  return (
    <div className="">
    <Box sx={{minHeight: '80vh'}}>
      <Grid maxHeight={'80%'} container justifyContent="center" className={classes.grid}>
        <Grid sx={{backgroundColor: color}} item xs={12} md={8.1} className={classes.gridItem}>
          <Banner tokens={walletTokens}/>
        </Grid>
        <Grid sx={{backgroundColor: color}} item xs={12} md={4} className={classes.gridItem}>
            <AssetsShares distribution={walletTokens} />
        </Grid>
        <Grid sx={{backgroundColor: color}} item xs={12} md={4} className={classes.gridItem}>
            <Nft collection={walletNFT} />
        </Grid>
        <Grid sx={{backgroundColor: color}} item xs={12} md={8.1} className={classes.gridItem}>
            <HistoryToken history={walletHistory}/>
        </Grid>
      </Grid>
    </Box>
    </div>
  ); 
};

export default Wallet;
