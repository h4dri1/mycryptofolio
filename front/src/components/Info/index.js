/* eslint-disable react/function-component-definition */
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getCryptoTrend, getFearGreedIndex } from '../../actions/cryptos';

import { getNFTList, resetNFTQuantity } from '../../actions/nft';

import { Grid, Box } from '@mui/material';

import { makeStyles } from '@mui/styles';
import TopFlop from './TopFlop'
import News from './News'
import TopNFT from './TopNFT'
import CryptoList from '../CryptoList'

import colors from '../../services/getColors'

export default function Info() {
  const useStyles = makeStyles({
    grid: {
      height: '100%',
      marginTop: '20px',
      marginBottom: '50px',
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: '10px',
      boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
      backgroundColor: image ? '#FF3CAC' : color,
      backgroundImage: image
    },
    gridSubItem: {
      // border: 'solid 2px gold',
      // height: '100%',
    }
  });

  const dispatch = useDispatch();

  const classes = useStyles();

  const { color, image } = colors()

  useEffect(() => {
    window.scrollTo(0, 0)
    //dispatch(resetNFTQuantity())
    dispatch(getCryptoTrend());
    dispatch(getFearGreedIndex());
    dispatch(getNFTList());
  }, []);

    return (
    <div className="">
      <Box sx={{minHeight: '80vh'}}>
        <Grid maxHeight={'80%'} container justifyContent="center" className={classes.grid}>
          <Grid sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, marginLeft:{xs: 1, md: 0}, marginRight:{xs: 1, md: 0}}} item xs={12} md={3} className={classes.gridItem}>
            <TopFlop/>
          </Grid>
          <Grid sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, marginLeft:{xs: 1, md: 2}, marginRight:{xs: 1, md: 2}}} item xs={12} md={3} className={classes.gridItem}>
            <News/>
          </Grid>
          <Grid sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, marginLeft:{xs: 1, md: 0}, marginRight:{xs: 1, md: 0}}} item xs={12} md={3} className={classes.gridItem}>
            <TopNFT/>
          </Grid>
            <CryptoList/>
        </Grid>
      </Box>
    </div>
    );
}
