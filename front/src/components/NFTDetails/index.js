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
import { Avatar, Typography, Container, Divider } from '@mui/material';
import { TextSnippetTwoTone } from '@mui/icons-material';

import { setDisplaySnackBar } from 'src/actions/settings';

import AvatarNFT from './banner'
import Description from './description';
import Data from './data';

const useStyles = makeStyles({
    grid: {
      minHeight: '84vh',
      marginTop: '100px'
    },
    gridItem: {
      borderColor: '#E7EBF0',
      borderRadius: 2,
      display: 'inline-flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'stretch',
      columnGap: '20rem'
    },
    gridSubItem: {
      border: 'solid 2px gold',
      height: '100%',
    },
  });

function NFTDetails() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { list, loading } = useSelector((state) => state.nftDetails.data);
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
    <Grid item xs={12} className={classes.gridItem}></Grid>   
        <AvatarNFT/>
    <Grid/>
    <Grid item xs={12} className={classes.gridItem}>
        <Description/> 
        <Data />
    </Grid>
</Grid >
  );
}

export default NFTDetails;
