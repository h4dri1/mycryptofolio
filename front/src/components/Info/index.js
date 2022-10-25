/* eslint-disable react/function-component-definition */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCryptoTrend, getFearGreedIndex } from '../../actions/cryptos';
import { getNFTList, resetNFTQuantity } from '../../actions/nft';
import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TopFlop from './TopFlop'
import News from './Sentiment'
import TopNFT from './TopNFT'
import CryptoList from '../CryptoList'
import colors from '../../services/getColors'

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
  }
});

const pixelRatio = window.devicePixelRatio

export default function Info() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { color } = colors()

  useEffect(() => {
    window.scrollTo(0, 0)
    //dispatch(resetNFTQuantity())
    dispatch(getCryptoTrend());
    dispatch(getFearGreedIndex());
    dispatch(getNFTList());
  }, []);

    return (
      <Box sx={{minHeight: '80vh'}}>
        <Grid maxHeight={'80%'} container justifyContent="center" className={classes.grid}>
          <Grid sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, marginLeft:{xs: 1, md: 0}, marginRight:{xs: 1, md: 0}}} item xs={12} md={pixelRatio > 1 ? 3 : 2.5} className={classes.gridItem}>
            <TopFlop pixelRatio={pixelRatio}/>
          </Grid>
          <Grid sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, marginLeft:{xs: 1, md: 2}, marginRight:{xs: 1, md: 2}}} item xs={12} md={pixelRatio > 1 ? 3 : 2.5} className={classes.gridItem}>
            <News/>
          </Grid>
          <Grid sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, marginLeft:{xs: 1, md: 0}, marginRight:{xs: 1, md: 0}}} item xs={12} md={pixelRatio > 1 ? 3 : 2.5} className={classes.gridItem}>
            <TopNFT pixelRatio={pixelRatio}/>
          </Grid>
            <CryptoList/>
        </Grid>
      </Box>
    );
}
