/* eslint-disable react/function-component-definition */
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import { Box, Skeleton } from '@mui/material';

import AssetsShares from './AssetsShares';
import Nft from './Nft';
import Banner from './Banner';

import { getWalletBalance, getWalletNFT, getWalletENS, getWalletHistory } from '../../actions/connectWallet';
import HistoryToken from './HistoryToken';

const useStyles = makeStyles({
  grid: {
    height: '100%',
    marginTop: '20px',
    marginBottom: '50px',
  },
  gridItem: {
    borderColor: '#E7EBF0',
    borderRadius: '10px',
    margin: '10px',
    

  },
  gridSubItem: {
    // border: 'solid 2px gold',
    // height: '100%',
  }
});

const Wallet = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { walletTokens, walletAddress, walletHistory } = useSelector((state) => state.connectWallet);
  const { walletNFT } = useSelector((state) => state.connectWallet);
  const { darkMode } = useSelector((state) => state.settings);

  const { colorTheme } = useSelector((state) => state.settings);

    if (colorTheme === 'gradient') {
        var color = '#FF3CAC'
        var image = 'linear-gradient(180deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'
    } else if (colorTheme === 'original') {
        if (!darkMode) {
            var color = 'rgb(58,12,163)'
            var image = 'linear-gradient(180deg, rgba(58,12,163,1) 0%, rgba(96,50,201,1) 100%)'
        } else {
            var color = 'rgba(2,50,107)'
            var image = 'linear-gradient(180deg, rgba(0,47,84,1) 0%, rgba(2,50,107,1) 100%)'
        }
    } else {
        var color = colorTheme
    }

  useEffect(() => {
    if (walletAddress !== 'Wallet') {
        dispatch(getWalletBalance())
        dispatch(getWalletHistory())
        dispatch(getWalletNFT())
        dispatch(getWalletENS())
    } else {
        navigate('/');
    }
  }, []);
  
  return (
    <div className="">
      <ConfirmDelete />
      <Box sx={{minHeight: '80vh'}}>
      <Grid maxHeight={'80%'} container justifyContent="center" className={classes.grid}>
        <Grid sx={{ boxShadow: 4, backgroundColor: image ? '#FF3CAC' : color, backgroundImage: image }} item xs={12} md={8.1} className={classes.gridItem}>
          <Banner tokens={walletTokens}/>
        </Grid>
        <Grid sx={{ boxShadow: 4, backgroundColor: image ? '#FF3CAC' : color, backgroundImage: image }} item xs={12} md={4} className={classes.gridItem}>
            <AssetsShares distribution={walletTokens} />
        </Grid>
        <Grid sx={{ boxShadow: 4, backgroundColor: image ? '#FF3CAC' : color, backgroundImage: image }} item xs={12} md={4} className={classes.gridItem}>
            <Nft collection={walletNFT} />
        </Grid>
        {/*<Grid sx={{ boxShadow: 4, backgroundColor: image ? '#FF3CAC' : color, backgroundImage: image }} item xs={12} md={4} className={classes.gridItem}>
            <HistoryToken history={walletHistory}/>
        </Grid>
        <Grid sx={{ boxShadow: 4, backgroundColor: image ? '#FF3CAC' : color, backgroundImage: image }} item xs={12} md={4} className={classes.gridItem}>
            
        </Grid>*/}
      </Grid>
      </Box>
    </div>
  ); 
};

export default Wallet;
