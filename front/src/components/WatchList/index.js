/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import FavCard from './FavCard';

import { Grid, Box } from '@mui/material';

import { makeStyles } from '@mui/styles';
import CryptoList from '../CryptoList'

import colors from '../../services/getColors'
import { getAllCryptos } from '../../actions/cryptos';

export default function WatchList({logged}) {
  const useStyles = makeStyles({
    grid: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      marginTop: '20px',
      maxWidth: '1200px'
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

  const navigate = useNavigate();

  const pixelRatio = window.devicePixelRatio

  const dispatch = useDispatch();

  const classes = useStyles();

  const { color, image } = colors()

  const { favorite } = useSelector((state) => state.favorite);
  const { allCryptos } = useSelector((state) => state.cryptos);
  const [cryptoList, setCryptoList] = useState([]);

  useEffect(() => {
    if (!logged) {
        navigate('/login?continue=/watchlist');   
    } else  {
        dispatch(getAllCryptos())
        setCryptoList([...cryptoList, allCryptos.filter((crypto) => {
            if (favorite.cryptos.find(e => e.coin_id === crypto.id)) {
              return crypto
            }
            })
        ])
    }
  }, []);

    return (
    <div className="">
      <Box sx={{display: 'flex', flexDirection:'column', minHeight: '80vh', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
        <Grid maxHeight={'80%'} container justifyContent="center" className={classes.grid}>
        {
            favorite.cryptos.length > 0 && favorite.cryptos.map((crypto, index) => (
                <Grid 
                    sx={{backgroundColor: color, marginBottom:{xs: 1, md: 0}, margin: 1}} 
                    item xs={12} md={pixelRatio > 1 ? 3 : 2} 
                    className={classes.gridItem}
                    key={index}
                >
                    <FavCard key={index} crypto={crypto} />
                </Grid>    
            ))
        }       
        </Grid>
        <Box mb={2}>
            <CryptoList favoritePage={true}/>
        </Box>
      </Box>
    </div>
    );
}