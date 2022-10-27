import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@mui/material';

export default function HeadTable(props) {
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
