/* eslint-disable react/jsx-no-useless-fragment */
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNFTData } from 'src/actions/nftDetails';

import Loading from '../Loading';

const useStyles = makeStyles({
  grid: {
    marginTop: '140px',
    height: '100%',
    padding: 0,
  },
  gridItem: {
    borderRadius: 2,
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

  for (const test in list) {
  console.log(list[test].image_url)
  }

  return (
    <></>
  );
}

export default NFTDetails;
