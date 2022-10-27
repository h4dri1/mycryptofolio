/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { LoadingButton } from '@mui/lab';
import { makeStyles, useTheme } from '@mui/styles';

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

const localString = (num) => num.toLocaleString('en-US', { maximumSignificantDigits: 4 });

const currency = (num, selectedCurrency) => {
  if (selectedCurrency === 'BTC') {
    return `₿${localString(num)}`;
  }
  if (selectedCurrency === 'ETH') {
    return `Ξ${localString(num)}`;
  }
  return num.toLocaleString('en-US', { style: 'currency', currency: selectedCurrency, maximumSignificantDigits: 4 });
};

const sortArray = (arr, key, orderBy) => {
  switch (orderBy) {
    case 'desc':
      return arr.sort((a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0));
    case 'asc':
      return arr.sort((a, b) => (a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0));
    default:
      return arr;
  }
};

function HeadTable(props) {
  const {
    logged, favorite, displayFav, orderDirection, sortRequest,
  } = props;

  const handleFavClick = () => (favorite?.cryptos[0]?.coin_id !== 'none' ? displayFav() : null);
  const handleSort = (key) => sortRequest(key);

  return (
    <TableHead>
      <TableRow>
        {logged && (
        <TableCell
          onClick={handleFavClick}
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
        <TableCell onClick={() => handleSort('current_price')} align="right">
          <TableSortLabel active direction={orderDirection}>
            Prix
          </TableSortLabel>
        </TableCell>
        <TableCell onClick={() => handleSort('price_change_percentage_24h')} sx={{ borderTopRightRadius: { xs: '10px', md: '0px' } }} align="right">
          <TableSortLabel active direction={orderDirection}>
            24h %
          </TableSortLabel>
        </TableCell>
        <TableCell onClick={() => handleSort('market_cap')} align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
          <TableSortLabel active direction={orderDirection}>
            Market Cap
          </TableSortLabel>
        </TableCell>
        <TableCell onClick={() => handleSort('total_volume')} align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>
          <TableSortLabel active direction={orderDirection}>
            Volume 24h
          </TableSortLabel>
        </TableCell>
        <TableCell onClick={() => handleSort('circulating_supply')} align="right" sx={{ borderTopRightRadius: '10px', display: { xs: 'none', lg: 'table-cell' } }}>
          <TableSortLabel active direction={orderDirection}>
            Circulating supply
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

function BodyTable(props) {
  const dispatch = useDispatch();
  const {
    cryptos, logged, favorite, selectedCurrency, loading,
  } = props;

  return (
    <TableBody>
      {(loading ? Array.from(new Array(10)) : cryptos).map((crypto, index) => (
        <TableRow key={index} hover>
          {logged && crypto && (
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
          <TableCell align="center" sx={{ color: 'primaryTextColor.main', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>
            { crypto ? crypto.market_cap_rank : <Skeleton variant="text" width={10} />}
          </TableCell>
          <TableCell sx={{ borderBottom: 0 }}>
            {crypto?.id ? (
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
            ) : <Box sx={{ display: 'flex', alignItems: 'center', margin: { xs: ' 0 -16px', sm: '0px' } }}><Skeleton variant="circular" width={40} height={40} /><Skeleton width={30} height={30} /><Skeleton width={30} height={30} /></Box>}
          </TableCell>
          <TableCell sx={{ borderBottom: 0, color: 'secondary.main' }} align="right">
            { crypto?.id ? currency(crypto.current_price, selectedCurrency) : <Skeleton /> }
          </TableCell>
          <TableCell align="right" sx={{ ...(crypto?.price_change_percentage_24h > 0 ? { color: '#1cb344' } : { color: '#eb3b5a' }), borderBottom: 0 }}>
            { crypto?.id ? `${crypto.price_change_percentage_24h.toFixed(2)}%` : <Skeleton />}
          </TableCell>
          <TableCell align="right" sx={{ color: 'secondary.main', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>
            { crypto?.id ? currency(crypto.market_cap, selectedCurrency) : <Skeleton />}
          </TableCell>
          <TableCell align="right" sx={{ color: 'secondary.main', borderBottom: 0, display: { xs: 'none', md: 'table-cell' } }}>
            { crypto?.id ? currency(crypto.total_volume, selectedCurrency) : <Skeleton />}
          </TableCell>
          <TableCell align="right" sx={{ color: 'secondary.main', borderBottom: 0, display: { xs: 'none', lg: 'table-cell' } }}>
            { crypto?.id ? currency(crypto.circulating_supply, selectedCurrency) : <Skeleton />}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

function FullTable(props) {
  const { cryptos } = props;

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: '10px', overflowX: 'initial', marginTop: 2, boxShadow: 5, width: { xs: 'auto', md: '1220px' }, minWidth: '344px',
      }}
    >
      <Table stickyHeader size="medium" sx={{ backgroundColor: 'primary.main', borderRadius: '10px' }}>
        <HeadTable {...props} />
        { cryptos.length > 0 ? (
          <BodyTable loading={false} {...props} />
        ) : (
          <BodyTable loading {...props} />
        )}
      </Table>
    </TableContainer>
  );
}

function TutoPage(props) {
  const {
    toggleBackdrop,
  } = props;
  const handleBackdrop = () => toggleBackdrop();

  return (
    <Backdrop
      sx={{
        display: 'flex', justifyContent: 'left', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open
      onClick={handleBackdrop}
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
        <MainContainer noButton {...props} />
      </Box>
    </Backdrop>
  );
}

function MoreCryptosButton(props) {
  const { cryptoListLoading } = props;
  const dispatch = useDispatch();

  const handleDispatchMoreCryptos = () => {
    dispatch(getMoreCryptos());
  };

  return (
    <Box>
      <LoadingButton
        variant="outlined"
        sx={{
          mt: 2, mb: 7, color: 'primary.light', borderColor: 'primary.light',
        }}
        loading={cryptoListLoading}
        onClick={handleDispatchMoreCryptos}
      >
        Charger plus de cryptos
      </LoadingButton>
    </Box>
  );
}

function MainContainer(props) {
  const {
    noButton, favoritePage, cryptoListLoading,
  } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
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

export default function CryptoList({ favoritePage, showTutorial }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);
  const { allCryptos } = useSelector((state) => state.cryptos);
  const { logged } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);

  const [orderDirection, setOrderDirection] = useState('asc');
  const [favClick, setFavClick] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(showTutorial);

  const favTable = () => {
    if (favoritePage || favClick) {
      const newCryptoList = favClick ? cryptos : allCryptos;
      // eslint-disable-next-line max-len
      return newCryptoList.filter((crypto) => favorite.cryptos.find((e) => e.coin_id === crypto.id));
    } if (showTutorial) {
      const someCryptos = cryptos.filter((_, index) => {
        if (index < 10) {
          return true;
        }
        return false;
      });
      return someCryptos;
    }
    return cryptos;
  };

  const handleToggleBackdrop = () => {
    setBackdropOpen(!backdropOpen);
  };

  const handleDisplayFav = () => {
    setFavClick(!favClick);
    favTable();
  };

  const handleSortRequest = (key) => {
    sortArray(cryptos, key, orderDirection);
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
    }
  }, [logged]);

  useEffect(() => {
    dispatch(getCryptoList());
  }, [selectedCurrency]);

  useEffect(() => {
    if (favorite.cryptos[0]?.coin_id === 'none') {
      setBackdropOpen(showTutorial);
    }
    else if (favorite.cryptos.length > 0 && showTutorial) {
      navigate('/watchlist');
    }
  }, [showTutorial, favorite.cryptos]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {backdropOpen
        ? (
          <TutoPage
            logged={logged}
            toggleBackdrop={handleToggleBackdrop}
            favoritePage={favoritePage}
            cryptoListLoading={cryptoListLoading}
            orderDirection={orderDirection}
            sortRequest={handleSortRequest}
            cryptos={favTable(cryptos)}
            favorite={favorite}
            selectedCurrency={selectedCurrency}
            showTutorial={showTutorial}
          />
        )
        : (
          <MainContainer
            logged={logged}
            favoritePage={favoritePage}
            cryptoListLoading={cryptoListLoading}
            displayFav={handleDisplayFav}
            orderDirection={orderDirection}
            sortRequest={handleSortRequest}
            cryptos={favTable(cryptos)}
            favorite={favorite}
            selectedCurrency={selectedCurrency}
            showTutorial={showTutorial}
          />
        )}
    </>

  );
}
