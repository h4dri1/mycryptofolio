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

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: '80%',
    },
  },
  cryptoList: {
    margin: '1% 1% 3% 1%',
  },
}));

function CryptoList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles(theme);

  const { list: cryptos, cryptoListLoading } = useSelector((state) => state.cryptos.cryptoList);

  useEffect(() => {
    dispatch(getCryptoList());
  }, []);

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Grid item xs={12} className={classes.cryptoList}>
        <Table>
          <TableHead sx={{ fontWeight: 'bold' }}>
            <TableRow>
              <TableCell align="center"><TableSortLabel />#</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Prix</TableCell>
              <TableCell align="right">24h %</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Market Cap</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Volume 24h</TableCell>
              <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>Circulating supply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {cryptos.map((crypto) => (
              <TableRow key={crypto.id} hover>
                <TableCell align="center" sx={{ padding: { xs: ' 0 -16px', sm: '0px' } }}>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <Box component={RouterLink} to={`/crypto/${crypto.id}`} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', margin: { xs: ' 0 -16px', sm: '0px' } }}>
                    <Avatar src={crypto.image} alt={crypto.name} sx={{ mr: 2 }} />
                    <Typography
                      variant="body1"
                      sx={{ mr: 1, display: { xs: 'none', sm: 'block', color: "neutral.contrastText" } }}
                    >{crypto.name}
                    </Typography>
                    <Typography>{crypto.symbol.toUpperCase()}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{`$${crypto.current_price.toLocaleString()}`}</TableCell>
                <TableCell align="right" sx={{ ...(crypto.price_change_percentage_24h > 0 ? { color: '#1cb344' } : { color: '#eb3b5a' }) }}>{crypto.price_change_percentage_24h.toLocaleString()}%</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', sm: 'table-cell' } }}>{`$${crypto.market_cap.toLocaleString()}`}</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{`$${crypto.total_volume.toLocaleString()}`}</TableCell>
                <TableCell align="right" sx={{ display: { xs: 'none', md: 'table-cell' } }}>{`$${crypto.circulating_supply.toLocaleString()}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item>
        <LoadingButton
          variant="outlined"
          sx={{ mb: 9 }}
          loading={cryptoListLoading}
          onClick={() => dispatch(getMoreCryptos())}
          sx={{ color: "primary.light" }}
        >
          Charger plus de cryptos
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default CryptoList;
