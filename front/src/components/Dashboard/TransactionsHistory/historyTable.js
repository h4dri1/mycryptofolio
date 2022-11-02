/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Container,
  TableContainer,
  Paper,
  Box,
  Avatar,
} from '@mui/material';

import EditOrDeleteItem from 'src/components/common/EditOrDeleteItem';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { toggleTransactionEditor, toggleConfirmDelete } from 'src/actions/settings';

const tableStyle = () => ({
  root: {
    '& .MuiTableCell-head': {
      backgroundColor: '#00b2cc;',
    },
  },
});

export default function HistoryTable(props) {
  const {
    transactions, darkMode, allCryptos, refCurrency,
  } = props;
  const addIcon = transactions.map((d) => allCryptos.find((c) => c.symbol === d.symbol)?.image);

  return (
    transactions[0] !== 'empty' ? (
      <TableContainer
        component={Paper}
        sx={{
          marginBottom: 2, backgroundColor: 'neutral.main', borderRadius: '10px', maxHeight: '25vh', maxWidth: '95%',
        }}
      >
        <Table stickyHeader size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={tableStyle().root}>
              <TableCell align="left" sx={{ padding: '.5em 0 0 3', borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Nom</TableCell>
              <TableCell align="center" sx={{ padding: '.5em 0', borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Prix d'achat</TableCell>
              <TableCell align="center" sx={{ padding: '.5em 0', borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Prix de vente</TableCell>
              <TableCell align="center" sx={{ padding: '.5em 0', borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Quantité</TableCell>
              <TableCell align="center" sx={{ padding: '.5em 0', display: { xs: 'none', md: 'table-cell' }, borderBottom: darkMode ? '1px solid #07f3d5' : '' }}>Date</TableCell>
              <TableCell align="center" sx={{ padding: '.5em 0', borderBottom: darkMode ? '1px solid #07f3d5' : '' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow hover key={transaction.id}>
                <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>
                  <Box sx={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <Avatar src={addIcon[index]} alt="crypto icon" style={{ width: '30px', height: '30px', marginLeft: 10 }} />
                    <Typography ml={2} variant="body2" sx={{ color: darkMode ? '#07f3d5' : '' }}>
                      {transaction.symbol.toUpperCase()}
                    </Typography>
                  </Box>
                </TableCell>
                {transaction.buy
                  ? (
                    <TableCell
                      align="center"
                      sx={{
                        color: '#3aa832', borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' },
                      }}
                    >{Intl.NumberFormat('en-US', {
                      style: 'currency', currency: refCurrency, maximumSignificantDigits: 4, minimumSignificantDigits: 2,
                    }).format(transaction.price)}
                    </TableCell>
                  )
                  : <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>-</TableCell>}
                {!transaction.buy
                  ? (
                    <TableCell
                      align="center"
                      sx={{
                        color: '#e65555', borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' },
                      }}
                    >{Intl.NumberFormat('en-US', {
                      style: 'currency', currency: refCurrency, maximumSignificantDigits: 4, minimumSignificantDigits: 2,
                    }).format(transaction.price)}
                    </TableCell>
                  )
                  : (
                    <TableCell
                      align="center"
                      sx={{
                        borderBottom: 0, borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' },
                      }}
                    >-
                    </TableCell>
                  )}
                <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumSignificantDigits: 4,
                    minimumSignificantDigits: 2,
                  }).format(transaction.buy ? transaction.quantity : (transaction.quantity * -1))}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: { xs: 'none', md: 'table-cell' }, borderBottom: 0, borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' },
                  }}
                >{new Date(transaction.buy_date).toLocaleDateString('en-GB')}
                </TableCell>
                {/* <TableCell align="right" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{transaction.rentability}%</TableCell> */}
                <TableCell align="right" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}> {/* sx={{ padding: { xs: '0', md: '16px' } }} */}
                  <EditOrDeleteItem
                    positionAbsolute={false}
                    editItem={toggleTransactionEditor}
                    deleteItem={() => toggleConfirmDelete({ type: 'transaction', itemId: transaction.id })}
                    itemId={transaction.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Container sx={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 4,
      }}
      >
        <ManageSearchIcon sx={{ fontSize: '4em', textAlign: 'center', width: '100%' }} />
        <Typography sx={{ textAlign: 'center', width: '100%', fontSize: '0.8em' }}>No transactions to display</Typography>
      </Container>
    )
  );
}
