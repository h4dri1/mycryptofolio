/* eslint-disable react/function-component-definition */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getCryptoTrend, getFearGreedIndex } from '../../actions/cryptos';
import { getNFTList, resetNFTQuantity } from '../../actions/nft';
import TopFlop from './TopFlop';
import Sentiment from './Sentiment';
import TopNFT from './TopNFT';
import CryptoList from '../CryptoList';
import colors from '../../services/getColors';

export default function Info() {
  const { color } = colors();

  const useStyles = makeStyles({
    grid: {
      height: '100%',
      marginTop: '20px',
      marginBottom: '50px',
    },
    gridItem: {
      backgroundColor: color,
      borderColor: '#E7EBF0',
      borderRadius: '10px',
      boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
    },
  });

  const dispatch = useDispatch();
  const classes = useStyles();
  const pixelRatio = window.devicePixelRatio;

  const { list: nfts } = useSelector((state) => state.nft.NFTList);
  const { list: cryptos } = useSelector((state) => state.cryptos.cryptoTrend);
  const { list: fearAndGreed } = useSelector((state) => state.cryptos.FearAndGreed);

  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(resetNFTQuantity())
    dispatch(getCryptoTrend());
    dispatch(getFearGreedIndex());
    dispatch(getNFTList());
  }, []);

  return (
    <Box sx={{ minHeight: '80vh' }}>
      <Grid maxHeight="80%" container justifyContent="center" className={classes.grid}>
        <Grid sx={{ margin: { xs: '0px 10px 10px 10px', md: '0px 0px 0px 0px' } }} item xs={12} md={pixelRatio > 1 ? 3 : 2.5} className={classes.gridItem}>
          <TopFlop cryptos={cryptos} pixelRatio={pixelRatio} />
        </Grid>
        <Grid sx={{ margin: { xs: '0px 10px 10px 10px', md: '0px 20px 0px 20px' } }} item xs={12} md={pixelRatio > 1 ? 3 : 2.5} className={classes.gridItem}>
          <Sentiment fearAndGreed={fearAndGreed} />
        </Grid>
        <Grid sx={{ margin: { xs: '0px 10px 10px 10px', md: '0px 0px 0px 0px' } }} item xs={12} md={pixelRatio > 1 ? 3 : 2.5} className={classes.gridItem}>
          <TopNFT nfts={nfts} pixelRatio={pixelRatio} />
        </Grid>
        <CryptoList />
      </Grid>
    </Box>
  );
}
