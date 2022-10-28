/* eslint-disable react/function-component-definition */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { getCryptoTrend, getFearGreedIndex } from '../../actions/cryptos';
import { getNFTList } from '../../actions/nft';
import TopFlop from './TopFlop';
import Sentiment from './Sentiment';
import TopNFT from './TopNFT';
import CryptoList from '../CryptoList';
import colors from '../../services/getColors';

const gridStyle = (props) => ({
  grid: {
    height: '100%',
    marginTop: '20px',
    marginBottom: '50px',
  },
  gridItem: {
    borderColor: '#E7EBF0',
    borderRadius: '10px',
    boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
    backgroundColor: colors().color,
    margin: props,
  },
});

export default function Info({ displayLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pixelRatio = window.devicePixelRatio;

  const nfts = useSelector((state) => state.nft.NFTList.list);
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
      <Grid maxHeight="80%" container justifyContent="center" sx={gridStyle().grid}>
        <Grid
          sx={gridStyle({ xs: '0px 10px 10px 10px', md: '0px 0px 0px 0px' }).gridItem}
          item
          xs={12}
          md={pixelRatio > 1 ? 3 : 2.5}
        >
          <TopFlop cryptos={cryptos} pixelRatio={pixelRatio} />
        </Grid>
        <Grid
          sx={gridStyle({ xs: '0px 10px 10px 10px', md: '0px 14px 0px 14px' }).gridItem}
          item
          xs={12}
          md={pixelRatio > 1 ? 3 : 2.5}
        >
          <Sentiment fearAndGreed={fearAndGreed} />
        </Grid>
        <Grid
          sx={gridStyle({ xs: '0px 10px 10px 10px', md: '0px 0px 0px 0px' }).gridItem}
          item
          xs={12}
          md={pixelRatio > 1 ? 3 : 2.5}
        >
          <TopNFT pixelRatio={pixelRatio} nfts={nfts} />
        </Grid>
        <CryptoList />
      </Grid>
    </Box>
  );
}
