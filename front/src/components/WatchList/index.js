/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Grid, Box } from '@mui/material';

import FavCard from './FavCard';
import CryptoList from '../CryptoList';

import colors from '../../services/getColors';

export default function WatchList() {
  const { color } = colors();

  const gridStyle = () => ({
    grid: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginTop: '20px',
      maxWidth: '1200px',
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: '10px',
      boxShadow: '1px 4px 9px 1px rgba(0,0,0,0.3)',
      backgroundColor: color,
      marginBottom: { xs: 1, md: 0 },
      margin: 1,
    },
  });

  const navigate = useNavigate();

  const pixelRatio = window.devicePixelRatio;

  const { favorite } = useSelector((state) => state.favorite);
  const { allCryptos } = useSelector((state) => state.cryptos);
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(() => {
    if (favorite.cryptos.length > 0 && favorite.cryptos[0]?.coin_id !== 'none') {
      setCryptoList([allCryptos.filter((crypto) => {
        if (favorite.cryptos.find((e) => e.coin_id === crypto.id)) {
          return crypto;
        }
      }),
      ]);
    }
    else if (favorite.cryptos[0]?.coin_id === 'none') {
      navigate('/market?continue=/addfav');
    }
  }, [favorite.cryptos, allCryptos]);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', minHeight: 'calc(100% - (130px + 50px))', alignItems: 'center', width: '100%',
    }}
    >
      <Grid maxHeight="80%" container justifyContent="center" sx={gridStyle().grid}>
        {
            cryptoList.length > 0 && cryptoList[0].map((crypto, index) => (
              <Grid
                sx={gridStyle().gridItem}
                item
                xs={5}
                md={pixelRatio > 1 ? 2 : 2.2}
                key={index}
              >
                <FavCard key={index} crypto={crypto} />
              </Grid>
            ))
        }
      </Grid>
      <Box mb={2}>
        <CryptoList favoritePage />
      </Box>
    </Box>
  );
}
