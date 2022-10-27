/* eslint-disable max-len */
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import {
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Box,
  Typography,
  Skeleton,
  IconButton,
} from '@mui/material';

import { addFavoriteCrypto, deleteFavoriteCrypto } from '../../../actions/favorite';
import currency from '../../../services/curFormatter';

export default function BodyTable(props) {
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
