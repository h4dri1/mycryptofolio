/* eslint-disable react/function-component-definition */
import { makeStyles } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid } from '@mui/material';
import colors from '../../services/getColors';

import AssetsShares from './AssetsShares';
import Nft from './Nft';
import Banner from './Banner';

import { getConnectAccount, getCurrentAccount } from '../../actions/metamask';

import HistoryToken from './HistoryToken';

const Wallet = () => {
  const { color } = colors();

  const gridStyle = ({
    grid: {
      height: '100%',
      marginTop: '20px',
      marginBottom: '50px',
    },
    gridItem: {
      backgroundColor: color,
      width: '95%',
      borderColor: '#E7EBF0',
      borderRadius: '10px',
      margin: '10px',
      boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
    },
  });

  const dispatch = useDispatch();

  const {
    walletTokens, walletAddress, walletNFT, walletHistory,
  } = useSelector((state) => state.wallet);

  useEffect(() => {
    if (walletAddress !== 'Wallet') {
      dispatch(getCurrentAccount());
    }
    else {
      dispatch(getConnectAccount());
    }
  }, [walletAddress]);

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Grid maxHeight="80%" container justifyContent="center" sx={gridStyle.grid}>
        <Grid sx={gridStyle.gridItem} item xs={12} md={8.1}>
          <Banner tokens={walletTokens} />
        </Grid>
        <Grid sx={gridStyle.gridItem} item xs={12} md={4}>
          <AssetsShares distribution={walletTokens} />
        </Grid>
        <Grid sx={gridStyle.gridItem} item xs={12} md={4}>
          <Nft collection={walletNFT} />
        </Grid>
        <Grid sx={gridStyle.gridItem} item xs={12} md={8.1}>
          <HistoryToken history={walletHistory} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Wallet;
