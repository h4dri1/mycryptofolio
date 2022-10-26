/* eslint-disable react/function-component-definition */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import { getCryptoTrend, getFearGreedIndex } from '../../actions/cryptos';
import { getNFTList, resetNFTQuantity } from '../../actions/nft';
import TopFlop from './TopFlop';
import Sentiment from './Sentiment';
import TopNFT from './TopNFT';
import CryptoList from '../CryptoList';
import colors from '../../services/getColors';

const pixelRatio = window.devicePixelRatio;

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
  },
});

const GridItem = (props) => {
  const { color } = colors();
  const classes = useStyles();
  const { children, ...rest } = props;

  return (
    <Grid
      sx={{
        backgroundColor: color,
        marginBottom: {
          xs: rest.mbxs,
          md: rest.mbmd,
        },
        marginLeft: {
          xs: rest.mlxs,
          md: rest.mlmd,
        },
        marginRight: {
          xs: rest.mrxs,
          md: rest.mrmd,
        },
      }}
      item
      xs={12}
      md={rest.pixelRatio > 1 ? 3 : 2.5}
      className={classes.gridItem}
    >
      {children}
    </Grid>
  );
};

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Info() {
  const dispatch = useDispatch();
  const classes = useStyles();

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
        <GridItem
          md={pixelRatio}
          mbxs={1}
          mbmd={0}
          mlxs={1}
          mlmd={0}
          mrxs={1}
          mrmd={0}
        >
          <TopFlop cryptos={cryptos} pixelRatio={pixelRatio} />
        </GridItem>
        <GridItem
          md={pixelRatio}
          mbxs={1}
          mbmd={0}
          mlxs={1}
          mlmd={2}
          mrxs={1}
          mrmd={2}
        >
          <Sentiment fearAndGreed={fearAndGreed} />
        </GridItem>
        <GridItem
          md={pixelRatio}
          mbxs={1}
          mbmd={0}
          mlxs={1}
          mlmd={0}
          mrxs={1}
          mrmd={0}
        >
          <TopNFT nfts={nfts} pixelRatio={pixelRatio} />
        </GridItem>
        <CryptoList />
      </Grid>
    </Box>
  );
}
