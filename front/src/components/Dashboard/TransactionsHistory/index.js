/* eslint-disable react/function-component-definition */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';

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

  const [selectedTransaction, setSelectedTransaction] = useState(undefined);

  const handleEditTransaction = (id) => {
    setSelectedTransaction(id);
    dispatch(toggleTransactionEditor());
  };

  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto',
    }}
    >
      <Typography color="primary.light" variant="h6">Historique des transactions</Typography>
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
            <TableCell align="right" />
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
              <TableCell align="center">{transaction.buy ? transaction.quantity : transaction.quantity * -1}</TableCell>
              <TableCell align="center">{new Date(transaction.buy_date).toLocaleDateString('en-GB')}</TableCell>
              <TableCell align="right">{transaction.rentability}%</TableCell>
              <TableCell align="right"> {/* sx={{ padding: { xs: '0', md: '16px' } }} */}
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
