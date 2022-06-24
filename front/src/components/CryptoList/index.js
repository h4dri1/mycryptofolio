import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { makeStyles, useTheme } from '@mui/styles';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCryptoList, getMoreCryptos } from 'src/actions/cryptos';

import Loading from '../Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto auto', 
    [theme.breakpoints.up('md')]: {
      maxWidth: '78%'
    },
  },
  cryptoList: {
    margin: '0% 1% 3% 1%',
  },
}));

function CryptoList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);
  const { selectedCurrency } = useSelector((state) => state.cryptos.cryptoList);
  const { darkMode } = useSelector((state) => state.settings);

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

  useEffect(() => { 
    dispatch(getCryptoList());
  }, []);

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Loading />
      <Grid item xs={12} className={classes.cryptoList}>
        <Table size='medium' aria-label="a dense table" sx={{backgroundColor: !darkMode ? '#fdecf7' : '#70516c', marginTop: 2, boxShadow: 5, borderRadius: '10px'}}>
          <TableHead >
            <TableRow>
              <TableCell align="center"><TableSortLabel />#</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Prix</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Market Cap</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Volume 24h</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', lg: 'table-cell' } }}>Circulating supply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {cryptos.map((crypto) => (
              <TableRow key={crypto.id} hover>
                <TableCell align="center" sx={{ padding: { xs: ' 0 -16px', sm: '0px' } }}>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <Box component={RouterLink} to={`/crypto/${crypto.id}`} sx={{ color: "primary.light", display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                    <Avatar src={crypto.image} alt={crypto.name} sx={{ mr: 2 }} />
                    <Typography

                      variant="body1"
                      sx={{ mr: 1, display: { xs: 'none', sm: 'block', color: !darkMode ? "neutral.contrastText" : '#07f3d5' } }}
                    >{crypto.name}
                    </Typography>
                    <Typography sx={{color: !darkMode ? "neutral.contrastText" : '#07f3d5'}}>{crypto.symbol.toUpperCase()}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{`${cryptoSym}${crypto.current_price.toLocaleString("en-US", curParams)}`}</TableCell>
                <TableCell align="right" sx={{ ...(crypto.price_change_percentage_24h > 0 ? { color: '#1cb344' } : { color: '#eb3b5a' }) }}>{crypto.price_change_percentage_24h.toLocaleString()}%</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{`${cryptoSym}${crypto.market_cap.toLocaleString("en-US", curParams)}`}</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{`${cryptoSym}${crypto.total_volume.toLocaleString("en-US", curParams)}`}</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', lg: 'table-cell' } }}>{`${cryptoSym}${crypto.circulating_supply.toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item>
        <LoadingButton
          variant="outlined"
          sx={{ mb: 7, color: "primary.light" }}
          loading={cryptoListLoading}
          onClick={() => dispatch(getMoreCryptos())}
        >
          Charger plus de cryptos
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default CryptoList;
