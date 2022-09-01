/* eslint-disable react/function-component-definition */
import { makeStyles } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDelete from 'src/components/common/ConfirmDelete';
import { Box, Grid } from '@mui/material';
import colors from '../../services/getColors'

import AssetsShares from './AssetsShares';
import Nft from './Nft';
import Banner from './Banner';

import { getCurrentAccount } from '../../actions/metamask';

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

  const { walletTokens, walletAddress, walletNFT } = useSelector((state) => state.wallet);
  const { color, image } = colors()

  useEffect(() => {
      if (walletAddress !== 'Wallet') {
          dispatch(getCurrentAccount())
      }
  },[])

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
