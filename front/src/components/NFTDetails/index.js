/* eslint-disable react/jsx-no-useless-fragment */
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNFTData } from 'src/actions/nftDetails';

import Loading from '../Loading';

import AvatarNFT from './banner'
import Description from './description';
import Data from './data';

const useStyles = makeStyles({
    grid: {
      minHeight: '84vh',
      marginTop: '20px'
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: 2,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    gridSubItem: {
      border: 'solid 2px gold',
      height: '100%',
    },
  });

function NFTDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { slug } = useParams();

  useEffect(async () => {
    await dispatch(fetchNFTData(slug));
  }, []);

  return (
    <Grid
        container
        display={'flex'}
        direction={'column'}
        alignItems={'center'}
        className={classes.grid}
    >
        <Loading />
        <Grid item xs={12} className={classes.gridItem} sx={{ width: '100%'}}>
            <AvatarNFT/>
        </Grid>
        <Grid item xs={12} className={classes.gridItem} sx={{ width: '90%', marginTop: 15}}>
            <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', minWidth: '320px' }}>
              <Description/> 
            </Box>
            <Box sx={{ width: '50%', display: 'flex', justifyContent: 'center', minWidth: '320px' }}>
              <Data />
            </Box>
        </Grid>
    </Grid >
  );
}

export default NFTDetails;
