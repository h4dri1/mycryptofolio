import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';

import { useSelector } from 'react-redux';

const TransactionsHistory = () => {
  const { transactions } = useSelector((state) => state.portfolio);

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto',
    }}
    >
      <Typography color="primary.main" variant="h6">Historique des transactions</Typography>
      <Divider sx={{ width: '100%' }} />
      <Table stickyHeader sx={{ maxWidth: '90%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Nom</TableCell>
            <TableCell align="center">Prix d'achat</TableCell>
            <TableCell align="center">Prix de vente</TableCell>
            <TableCell align="center">Quantité</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="right">%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell align="left">{transaction.symbol}</TableCell>
              {transaction.buy
                ? <TableCell align="center">{`$${transaction.price.toLocaleString()}`}</TableCell>
                : <TableCell align="center">-</TableCell>}
              {!transaction.buy
                ? <TableCell align="center">{`$${transaction.price.toLocaleString()}`}</TableCell>
                : <TableCell align="center">-</TableCell>}
              <TableCell align="center">{transaction.quantity}</TableCell>
              <TableCell align="center">{new Date(transaction.buy_date).toLocaleDateString('en-GB')}</TableCell>
              <TableCell align="right">{transaction.rentability}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TransactionsHistory;
