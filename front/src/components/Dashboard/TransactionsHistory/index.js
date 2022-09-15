/* eslint-disable react/function-component-definition */
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Divider, Modal } from '@mui/material';

import EditOrDeleteItem from 'src/components/common/EditOrDeleteItem';
import TransactionCreator from 'src/components/Dashboard/TransactionCreator';

import { useDispatch, useSelector } from 'react-redux';

import { toggleTransactionEditor, toggleConfirmDelete } from 'src/actions/settings';
import { useState } from 'react';

const modalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TransactionsHistory = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.portfolio);
  const { transactionEditorIsOpen } = useSelector((state) => state.settings);
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);

  const [selectedTransaction, setSelectedTransaction] = useState(undefined);

  const handleEditTransaction = (id) => {
    setSelectedTransaction(id);
    dispatch(toggleTransactionEditor());
  };

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto', 
      '&::-webkit-scrollbar': {
        width: '0.4em'
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#7f5cce',
        outline: '1px solid slategrey'
      }
    }}
    >
      <Typography color="primary.light" variant="h6">Historique des transactions</Typography>
      <Divider sx={{ width: '100%' }} />
      <Table stickyHeader sx={{ maxWidth: '90%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }}>Nom</TableCell>
            <TableCell align="center" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }}>Prix d'achat</TableCell>
            <TableCell align="center" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }}>Prix de vente</TableCell>
            <TableCell align="center" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }}>Quantité</TableCell>
            <TableCell align="center" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }}>Date</TableCell>
            {/* <TableCell align="right" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }}>%</TableCell> */}
            <TableCell align="right" sx={{ padding: { xs: '0', sm: '1em 0' }, fontSize: { xs: '.8rem', sm: '.875rem' } }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell align="left" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{transaction.symbol.toUpperCase()}</TableCell>
              {transaction.buy
                ? <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: refCurrency, maximumSignificantDigits: 4, minimumSignificantDigits: 2 }).format(transaction.price)}</TableCell>
                : <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>-</TableCell>}
              {!transaction.buy
                ? <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: refCurrency, maximumSignificantDigits: 4, minimumSignificantDigits: 2 }).format(transaction.price)}</TableCell>
                : <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>-</TableCell>}
              <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>
                {Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  maximumSignificantDigits: 4,
                  minimumSignificantDigits: 2,
                }).format(transaction.buy ? transaction.quantity : (transaction.quantity * -1))}
              </TableCell>
              <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{new Date(transaction.buy_date).toLocaleDateString('en-GB')}</TableCell>
              {/* <TableCell align="right" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{transaction.rentability}%</TableCell> */}
              <TableCell align="right" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}> {/* sx={{ padding: { xs: '0', md: '16px' } }} */}
                <EditOrDeleteItem
                  positionAbsolute={false}
                  editItem={handleEditTransaction}
                  deleteItem={() => toggleConfirmDelete({ type: 'transaction', itemId: transaction.id })}
                  itemId={transaction.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={transactionEditorIsOpen} onClose={() => dispatch(toggleTransactionEditor())}>
        <Box sx={modalBoxStyle}>
          <TransactionCreator id={selectedTransaction} />
        </Box>
      </Modal>
    </Box>
  );
};

export default TransactionsHistory;
