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

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { makeStyles, useTheme } from '@mui/styles';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getCryptoList, getMoreCryptos } from 'src/actions/cryptos';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addFavoriteCrypto, deleteFavoriteCrypto, fetchFavoriteCryptos } from '../../actions/favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTableCell-head': {
      backgroundColor: '#00b2cc',
    },
  },
  cryptoList: {
    margin: '0% 1% 3% 1%',
  },
}));

function CryptoList({ favoritePage, showTutorial }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);
  const { allCryptos } = useSelector((state) => state.cryptos);
  const { logged } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [favClick, setFavClick] = useState(false);
  const [cryptoListFav, setCryptoListFav] = useState(cryptos);
  const [backdropOpen, setBackdropOpen] = useState(showTutorial);
  const navigate = useNavigate();

  if (selectedCurrency === 'BTC') {
    var curParams = {
      maximumSignificantDigits: 4,
    };
    var cryptoSym = '₿';
  }
  else if (selectedCurrency === 'ETH') {
    var curParams = {
      maximumSignificantDigits: 4,
    };
    var cryptoSym = 'Ξ';
  }
  else {
    var curParams = {
      style: 'currency',
      currency: selectedCurrency,
      maximumSignificantDigits: 4,
    };
    var cryptoSym = '';
  }

  const sortArray = (arr, key, orderBy) => {
    switch (orderBy) {
      case 'desc':
      default:
        return arr.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
      case 'asc':
        return arr.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));
    }
  };

  const handleSortRequest = (key) => {
    sortArray(cryptos, key, orderDirection);
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
    }
    if (favoritePage) {
      setCryptoListFav(allCryptos);
    }
    dispatch(getCryptoList());
  }, [logged, allCryptos, selectedCurrency]);

  useEffect(() => {
    if (favorite.cryptos[0]?.coin_id === 'none') {
      setBackdropOpen(showTutorial);
    }
    else if (favorite.cryptos.length > 0 && showTutorial) {
      navigate('/watchlist');
    }
  }, [showTutorial, favorite.cryptos]);

  const handleDisplayFav = () => {
    setFavClick(!favClick);
    favTable();
  };

  const favTable = () => {
    if (favoritePage || favClick) {
      const newCryptoList = favClick ? cryptos : cryptoListFav;
      return newCryptoList.filter((crypto) => {
        if (favorite.cryptos.find((e) => e.coin_id === crypto.id)) {
          return crypto;
        }
      });
    } if (showTutorial) {
      let someCryptos;
      someCryptos = cryptos.filter((_, index) => {
        if (index < 10) {
          return true;
        }
        return false;
      });
      return someCryptos;
    }
    return cryptos;
  };

  function TableCont() {
    return (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: '10px', overflowX: 'initial', marginTop: 2, boxShadow: 5, width: { xs: 'auto', md: '1220px' }, minWidth: '344px',
        }}
      >
        <Table stickyHeader size="medium" sx={{ backgroundColor: 'primary.main', borderRadius: '10px' }}>
          <TableHead>
            <TableRow>
              {logged && (
              <TableCell
                onClick={() => {
                  favorite.cryptos[0]?.coin_id !== 'none' ? handleDisplayFav() : null;
                }}
                align="center"
                sx={{ borderTopLeftRadius: '10px', padding: 0 }}
              >
                <TableSortLabel active={favorite.cryptos[0]?.coin_id !== 'none'}>
                  Favoris
                </TableSortLabel>
              </TableCell>
              )}
              <TableCell sx={{ borderTopLeftRadius: logged ? '0px' : '10px', display: { xs: 'none', sm: 'table-cell' } }} align="center">
                #
              </TableCell>
              <TableCell sx={{ borderTopLeftRadius: !logged ? { xs: '10px', md: '0px' } : '0px' }} align="left">Nom</TableCell>
              <TableCell onClick={() => handleSortRequest('current_price')} align="right">
                <TableSortLabel active direction={orderDirection}>
                  Prix
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => handleSortRequest('price_change_percentage_24h')} sx={{ borderTopRightRadius: { xs: '10px', md: '0px' } }} align="right">
                <TableSortLabel active direction={orderDirection}>
                  24h %
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => handleSortRequest('market_cap')} align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                <TableSortLabel active direction={orderDirection}>
                  Market Cap
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => handleSortRequest('total_volume')} align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                <TableSortLabel active direction={orderDirection}>
                  Volume 24h
                </TableSortLabel>
              </TableCell>
              <TableCell onClick={() => handleSortRequest('circulating_supply')} align="right" sx={{ borderTopRightRadius: '10px', display: { xs: 'none', lg: 'table-cell' } }}>
                <TableSortLabel active direction={orderDirection}>
                  Circulating supply
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {cryptos.length > 0 ? favTable().map((crypto) => (
              <TableRow key={crypto.id} hover>
                {logged && (
                <TableCell align="center" sx={{ color: 'primaryTextColor.main', borderBottom: 0 }}>
                  {favorite.cryptos.length > 0 && favorite.cryptos.some((e) => e.coin_id === crypto.id) ? (
                    <IconButton color="secondary" value={crypto.id} onClick={() => dispatch(deleteFavoriteCrypto(crypto.id))}>
                      <StarIcon />
                    </IconButton>
                  ) : (
                    <IconButton color="secondary" value={crypto.id} onClick={() => dispatch(addFavoriteCrypto(crypto.id))}>
                      <StarOutlineIcon />
                    </IconButton>
                  )}
                </TableCell>
                )}
                <TableCell align="center" sx={{ color: 'primaryTextColor.main', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>{crypto.market_cap_rank}</TableCell>
                <TableCell sx={{ borderBottom: 0 }}>
                  <Box
                    component={RouterLink}
                    to={`/crypto/${crypto.id}`}
                    sx={{
                      color: 'primary.light', display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: '0px', sm: '0px' },
                    }}
                  >
                    <Avatar loading="lazy" src={crypto.image.replace('large', 'small')} alt={crypto.name} sx={{ mr: 1, width: { xs: '20px', md: '40px' }, height: { xs: '20px', md: '40px' } }} />
                    <Typography
                      sx={{ mr: 1, display: { xs: 'none', sm: 'block' }, color: 'secondary.light' }}
                    >{crypto.name}
                    </Typography>
                    <Typography sx={{ color: 'primary.light', fontWeight: 'bold' }}>{crypto.symbol.toUpperCase()}</Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ borderBottom: 0, color: 'secondary.main' }} align="right">{`${cryptoSym}${crypto.current_price.toLocaleString('en-US', curParams)}`}</TableCell>
                <TableCell align="right" sx={{ ...(crypto.price_change_percentage_24h > 0 ? { color: '#1cb344' } : { color: '#eb3b5a' }), borderBottom: 0 }}>{crypto.price_change_percentage_24h.toFixed(2)}%</TableCell>
                <TableCell align="right" sx={{ color: 'secondary.main', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>{`${cryptoSym}${crypto.market_cap.toLocaleString('en-US', curParams)}`}</TableCell>
                <TableCell align="right" sx={{ color: 'secondary.main', borderBottom: 0, display: { xs: 'none', md: 'table-cell' } }}>{`${cryptoSym}${crypto.total_volume.toLocaleString('en-US', curParams)}`}</TableCell>
                <TableCell align="right" sx={{ color: 'secondary.main', borderBottom: 0, display: { xs: 'none', lg: 'table-cell' } }}>{`${cryptoSym}${crypto.circulating_supply.toLocaleString()}`}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell sx={{ borderBottom: 0 }} align="center"><Skeleton variant="text" sx={{ marginLeft: 3, width: 20, height: 30 }} /></TableCell>
                <TableCell sx={{ borderBottom: 0 }} align="right"><Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}><Skeleton variant="circular" sx={{ width: 40, height: 40 }} /><Skeleton variant="text" sx={{ marginLeft: 1, width: 50, height: 30 }} /></Box></TableCell>
                <TableCell sx={{ borderBottom: 0 }} align="right"><Box sx={{ display: 'flex', justifyContent: 'right' }}><Skeleton variant="text" sx={{ width: 50, height: 40 }} /></Box></TableCell>
                <TableCell sx={{ borderBottom: 0 }} align="center"><Box sx={{ display: 'flex', justifyContent: 'right' }}><Skeleton variant="text" sx={{ width: 50, height: 40 }} /></Box></TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, borderBottom: 0 }} align="center"><Box sx={{ display: 'flex', justifyContent: 'right' }}><Skeleton variant="text" sx={{ width: 100, height: 40 }} /></Box></TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, borderBottom: 0 }} align="center"><Box sx={{ display: 'flex', justifyContent: 'right' }}><Skeleton variant="text" sx={{ width: 100, height: 40 }} /></Box></TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, borderBottom: 0 }} align="center"><Box sx={{ display: 'flex', justifyContent: 'right' }}><Skeleton variant="text" sx={{ width: 100, height: 40 }} /></Box></TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  function MainContainer({ noButton }) {
    return (
      <Container
        className={classes.root}
        sx={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        }}
      >
        <TableCont />
        {!favoritePage && !noButton && (
        <Box>
          <LoadingButton
            variant="outlined"
            sx={{
              mt: 2, mb: 7, color: 'primary.light', borderColor: 'primary.light',
            }}
            loading={cryptoListLoading}
            onClick={() => dispatch(getMoreCryptos())}
          >
            Charger plus de cryptos
          </LoadingButton>
        </Box>
        )}
      </Container>
    );
  }

  return (
    <>
      { backdropOpen
        ? (
          <Backdrop
            sx={{
              display: 'flex', justifyContent: 'left', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
            onClick={() => setBackdropOpen(!backdropOpen)}
          >
            <Box sx={{ display: 'flex' }}>
              <Fade
                in
                sx={{
                  color: 'white', fontSize: 20, fontWeight: 'bold', marginRight: 2, height: '0px', mt: { xs: 25, md: 11.5 }, ml: 2,
                }}
                timeout={{ enter: 3000, exit: 1 }}
              >

                <Typography>Ajouter d'abord des favoris</Typography>

              </Fade>
              <Slide direction="right" in mountOnEnter unmountOnExit timeout={{ enter: 1000, exit: 1 }}>

                <ArrowForwardIcon sx={{ fontSize: 50, marginTop: { xs: 29, md: 10.5 }, marginRight: { xs: 0, md: 1 } }} />

              </Slide>
              <MainContainer noButton />
            </Box>

          </Backdrop>
        ) : <MainContainer />}
    </>

  );
}

export default CryptoList;
