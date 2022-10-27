/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { LoadingButton } from '@mui/lab';
import { makeStyles } from '@mui/styles';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  Avatar,
  Box,
  Typography,
  Skeleton,
  TableContainer,
  Paper,
  IconButton,
  Container,
  Backdrop,
  Slide,
  Fade,
} from '@mui/material';

import { getCryptoList, getMoreCryptos } from '../../actions/cryptos';
import { fetchFavoriteCryptos } from '../../actions/favorite';
import FullTable from './Table/FullTable';
import MoreCryptosButton from './moreCryptosButton';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiTableCell-head': {
      backgroundColor: '#00b2cc',
    },
  },
  cryptoList: {
    margin: '0% 1% 3% 1%',
  },
}));

export default function MainContainer(props) {
  const {
    noButton, favoritePage, cryptoListLoading,
  } = props;
  const classes = useStyles();
  return (
    <Container
      className={classes.root}
      sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
      }}
    >
      <FullTable {...props} />
      {!favoritePage && !noButton && (
      <MoreCryptosButton cryptoListLoading={cryptoListLoading} />
      )}
    </Container>
  );
}
