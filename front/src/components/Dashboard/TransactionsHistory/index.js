/* eslint-disable react/function-component-definition */
import { Box, Typography, Table, TableHead, TableBody, TableRow, TableCell, Divider, Modal, Container, Skeleton, TableContainer, Paper } from '@mui/material';

import EditOrDeleteItem from 'src/components/common/EditOrDeleteItem';
import TransactionCreator from 'src/components/Dashboard/TransactionCreator';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { makeStyles } from '@mui/styles';

import { useDispatch, useSelector } from 'react-redux';

import { toggleTransactionEditor, toggleConfirmDelete } from 'src/actions/settings';

import HistoryIcon from '@mui/icons-material/History';
import { useState } from 'react';
import { updateSelectedTransaction } from '../../../actions/portfolio';

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
  borderRadius: '10px'
};

export default function TransactionsHistory({transactions}) {
  const dispatch = useDispatch();
  const { transactionEditorIsOpen } = useSelector((state) => state.settings);
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const { darkMode } = useSelector((state) => state.settings);

  const { selectedTransaction } = useSelector((state) => state.portfolio);

  const useStyles = makeStyles({
    root: {
        "& .MuiTableCell-head": {
            backgroundColor: "#00b2cc;"
        },
    }
  });

  const classes = useStyles();

  const TableContainerFunction = () => {
    return (
      transactions[0] !== 'empty' ? (
        <TableContainer component={Paper} sx={{marginBottom: 2, backgroundColor: 'neutral.main', borderRadius: '10px', maxHeight: '25vh', maxWidth: '95%'}}>
        <Table stickyHeader size='small' aria-label="a dense table" sx={{ maxWidth: '100%', p: '10'}}>
          <TableHead>
          <TableRow className={classes.root}>
            <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Nom</TableCell>
            <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Prix d'achat</TableCell>
            <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Prix de vente</TableCell>
            <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Quantité</TableCell>
            <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}>Date</TableCell>          
            <TableCell align="center" sx={{borderBottom: darkMode ? '1px solid #07f3d5' : ''}}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{transaction.symbol.toUpperCase()}</TableCell>
                {transaction.buy
                  ? <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: refCurrency, maximumSignificantDigits: 4, minimumSignificantDigits: 2 }).format(transaction.price)}</TableCell>
                  : <TableCell align="center" sx={{ padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>-</TableCell>}
                {!transaction.buy
                  ? <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{Intl.NumberFormat('en-US', { style: 'currency', currency: refCurrency, maximumSignificantDigits: 4, minimumSignificantDigits: 2 }).format(transaction.price)}</TableCell>
                  : <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>-</TableCell>}
                <TableCell align="center" sx={{ borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>
                  {Intl.NumberFormat('en-US', {
                    style: 'decimal',
                    maximumSignificantDigits: 4,
                    minimumSignificantDigits: 2,
                  }).format(transaction.buy ? transaction.quantity : (transaction.quantity * -1))}
                </TableCell>
                <TableCell align="center" sx={{ borderBottom: 0, borderBottom: 0, padding: '.5em 0', fontSize: { xs: '.7rem', sm: '.875rem' } }}>{new Date(transaction.buy_date).toLocaleDateString('en-GB')}</TableCell>
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
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center', marginTop: 1, marginBottom: 4}}>
          <ManageSearchIcon sx={{fontSize: '4em', textAlign: 'center', width: '100%'}}/>
          <Typography sx={{textAlign: 'center', width: '100%', fontSize: '0.8em'}}>No transactions to display</Typography>
        </Container>
      )
    );
  }

  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: '100%', width:'100%'}}>
        <Container sx={{ display: 'flex', marginBottom: 1, marginTop: 1, justifyContent: 'center', width:'100%' }}>
            <HistoryIcon sx={{color: 'secondary.dark'}}/><Typography sx={{ fontWeight: 'bold', color:'primaryTextColor.main' }}>Token Transfert History</Typography>
        </Container>
        <Container sx={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        overflowY: 'auto', 
        justifyContent: 'center',
        padding: '0',
      }}>
        {transactions.length > 0 ? <TableContainerFunction/> : <Skeleton sx={{width:{xs:'300px', md:"1200px"}, height:{xs:"83px", md:'200px'}, borderRadius: '10px', marginBottom: 2}} variant="rectangle"/>}
      </Container>

      <Modal open={transactionEditorIsOpen} onClose={() => dispatch(toggleTransactionEditor())}>
        <Box sx={modalBoxStyle}>
          <TransactionCreator id={selectedTransaction} transaction={transactions.find(e => e.id === selectedTransaction)} />
        </Box>
      </Modal>
    </Container>
  );
};
