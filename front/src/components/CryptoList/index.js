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
  Grid,
  Skeleton,
  TableContainer,
  Paper,
  IconButton,
  Container
} from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import { makeStyles, useTheme, styled } from '@mui/styles';
import {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getCryptoList, getMoreCryptos } from 'src/actions/cryptos';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { addFavoriteCrypto, deleteFavoriteCrypto, fetchFavoriteCryptos } from '../../actions/favorite';
import { getAllCryptos } from '../../actions/cryptos';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTableCell-head": {
      backgroundColor: "#00b2cc",
  },
  },
  cryptoList: {
    margin: '0% 1% 3% 1%',
  },
}));

function CryptoList({favoritePage}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const { darkMode } = useSelector((state) => state.settings);
  const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);
  const { allCryptos } = useSelector((state) => state.cryptos);
  const { logged } = useSelector((state) => state.user);
  const { favorite } = useSelector((state) => state.favorite);
  
  const [rowData, setRowData] = useState(cryptos);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [favClick, setFavClick] = useState(false);
  const [cryptoListFav, setCryptoListFav] = useState(cryptos);

  if (selectedCurrency === 'BTC') {
    var curParams = {
      maximumSignificantDigits: 4
    }
    var cryptoSym = '₿'
  } else if (selectedCurrency === 'ETH') {
    var curParams = {
      maximumSignificantDigits: 4
    }
    var cryptoSym = 'Ξ'
  } else {
    var curParams = {
      style: "currency",
      currency: selectedCurrency,
      maximumSignificantDigits: 4
    }
    var cryptoSym = ''
  }

  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.market_cap_rank > b.market_cap_rank ? 1 : b.market_cap_rank > a.market_cap_rank ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.market_cap_rank < b.market_cap_rank ? 1 : b.market_cap_rank < a.market_cap_rank ? -1 : 0
        );
    }
  };
   
  const handleSortRequest = () => {
    setRowData(sortArray(cryptos, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    if (logged) {
      dispatch(fetchFavoriteCryptos());
    }
    if (favoritePage) {
      setCryptoListFav(allCryptos);
    }
    dispatch(getCryptoList());
    handleSortRequest()
  }, [logged, allCryptos, selectedCurrency]);

  const handleDisplayFav = () => {
    setFavClick(!favClick);
    favTable();
  }

  const favTable = () => {
    if (favoritePage || favClick) {
      return cryptoListFav.filter((crypto) => {
        if (favorite.cryptos.find(e => e.coin_id === crypto.id)) {
          return crypto
        }
      })
    } else {
      return cryptos
    }
  }

  const TableCont = () => {
    return (
      <TableContainer component={Paper} sx={{borderRadius: '10px', marginTop: 2, boxShadow: 5, width: {xs:'auto', md:'1220px'}, minWidth:'344px'}}>
      <Table size='medium' sx={{backgroundColor: 'primary.main'}}>
        <TableHead>
          <TableRow>
            {logged && (<TableCell onClick={handleDisplayFav} align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}><TableSortLabel active={true}>Favoris</TableSortLabel></TableCell>)}
            <TableCell onClick={handleSortRequest} sx={{borderBottom: darkMode ? '1px solid #07f3d5' : '', display: { xs: 'none', sm: 'table-cell' }}} align="center">
              <TableSortLabel active={true} direction={orderDirection}>
                #
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Nom</TableCell>
            <TableCell sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}} align="right">Prix</TableCell>
            <TableCell sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}} align="right">24h %</TableCell>
            <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' }, borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Market Cap</TableCell>
            <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' }, borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Volume 24h</TableCell>
            <TableCell align="right" sx={{ display: { xs: 'none', lg: 'table-cell' }, borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Circulating supply</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>

          {cryptos.length > 0 ? favTable().map((crypto) => (
            <TableRow key={crypto.id} hover>
              {logged && (
              <TableCell align="center" sx={{ color: 'primaryTextColor.main', padding: { xs: ' 0 -16px', sm: '0px' }, borderBottom: 0 }}>
                {favorite.cryptos.length > 0 && favorite.cryptos.some(e => e.coin_id === crypto.id) ? (
                  <IconButton color='secondary' value={crypto.id} onClick={e => dispatch(deleteFavoriteCrypto(crypto.id))}>
                    <StarIcon/>
                  </IconButton>) : (
                  <IconButton color='secondary' value={crypto.id} onClick={() => dispatch(addFavoriteCrypto(crypto.id))}>
                    <StarOutlineIcon/>
                  </IconButton>
                  )
                }
              </TableCell>
              )}
              <TableCell align="center" sx={{ color: 'primaryTextColor.main', padding: { xs: ' 0 -16px', sm: '0px' }, borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>{crypto.market_cap_rank}</TableCell>
              <TableCell sx={{borderBottom: 0}}>
                <Box component={RouterLink} to={`/crypto/${crypto.id}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                  <Avatar loading='lazy' src={crypto.image.replace('large', 'small')} alt={crypto.name} sx={{ mr: 1, width:{xs:'20px', md: '40px'}, height:{xs:'20px', md: '40px'} }} />
                  <Typography
                    sx={{ mr: 1, display: { xs: 'none', sm: 'block'}, color:'secondary.light' }}
                  >{crypto.name}
                  </Typography>
                  <Typography sx={{color: "primary.light", fontWeight:'bold'}}>{crypto.symbol.toUpperCase()}</Typography>
                </Box>
              </TableCell>
              <TableCell sx= {{borderBottom: 0, color:'secondary.main'}} align="right">{`${cryptoSym}${crypto.current_price.toLocaleString("en-US", curParams)}`}</TableCell>
              <TableCell align="right" sx={{ ...(crypto.price_change_percentage_24h > 0 ? { color: '#1cb344' } : { color: '#eb3b5a' }), borderBottom: 0 }}>{crypto.price_change_percentage_24h.toFixed(2)}%</TableCell>
              <TableCell align="right" sx={{ color:'secondary.main', borderBottom: 0, display: { xs: 'none', sm: 'table-cell' } }}>{`${cryptoSym}${crypto.market_cap.toLocaleString("en-US", curParams)}`}</TableCell>
              <TableCell align="right" sx={{ color:'secondary.main', borderBottom: 0, display: { xs: 'none', md: 'table-cell' } }}>{`${cryptoSym}${crypto.total_volume.toLocaleString("en-US", curParams)}`}</TableCell>
              <TableCell align="right" sx={{ color:'secondary.main', borderBottom: 0, display: { xs: 'none', lg: 'table-cell' } }}>{`${cryptoSym}${crypto.circulating_supply.toLocaleString()}`}</TableCell>
            </TableRow>
          )) : <TableRow>
                  <TableCell sx={{borderBottom: 0}} align="center"><Skeleton variant='text' sx={{marginLeft: 3, width: 20, height: 30}}/></TableCell>
                  <TableCell sx={{borderBottom: 0}} align="right"><Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><Skeleton variant='circular' sx={{width: 40, height: 40}}/><Skeleton variant='text' sx={{marginLeft: 1, width: 50, height: 30}}></Skeleton></Box></TableCell>
                  <TableCell sx={{borderBottom: 0}} align="right"><Box sx={{display: 'flex', justifyContent: 'right'}}><Skeleton variant='text' sx={{width: 50, height: 40}}/></Box></TableCell>
                  <TableCell sx={{borderBottom: 0}} align="center"><Box sx={{display: 'flex', justifyContent: 'right'}}><Skeleton variant='text' sx={{width: 50, height: 40}}/></Box></TableCell>
                  <TableCell sx={{display: { xs: 'none', sm: 'table-cell' }, borderBottom: 0}} align="center"><Box sx={{display: 'flex', justifyContent: 'right'}}><Skeleton variant='text' sx={{width: 100, height: 40}}/></Box></TableCell>
                  <TableCell sx={{display: { xs: 'none', sm: 'table-cell' }, borderBottom: 0}} align="center"><Box sx={{display: 'flex', justifyContent: 'right'}}><Skeleton variant='text' sx={{width: 100, height: 40}}/></Box></TableCell>
                  <TableCell sx={{display: { xs: 'none', sm: 'table-cell' }, borderBottom: 0}} align="center"><Box sx={{display: 'flex', justifyContent: 'right'}}><Skeleton variant='text' sx={{width: 100, height: 40}}/></Box></TableCell>
               </TableRow>}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

  return (
    <Container className={classes.root} sx={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
      <TableCont/>
      {!favoritePage && <Box>
        <LoadingButton
          variant="outlined"
          sx={{ mt:2, mb: 7, color: "secondary.dark", borderColor: "secondary.dark"}}
          loading={cryptoListLoading}
          onClick={() => dispatch(getMoreCryptos())}
        >
          Charger plus de cryptos
        </LoadingButton>
      </Box>}
    </Container>
  );
}

export default CryptoList;
