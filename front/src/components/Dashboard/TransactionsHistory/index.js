/* eslint-disable max-len */
/* eslint-disable react/function-component-definition */
import {
  Typography,
  Container,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  IconButton,
} from '@mui/material';

import TransactionCreator from 'src/components/Dashboard/TransactionCreator';

import { useDispatch, useSelector } from 'react-redux';

import { toggleTransactionEditor } from 'src/actions/settings';

import HistoryIcon from '@mui/icons-material/History';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import HistoryTable from './historyTable';

export default function TransactionsHistory({ transactions }) {
  const dispatch = useDispatch();
  const { transactionEditorIsOpen } = useSelector((state) => state.settings);
  const refCurrency = useSelector((state) => state.cryptos.cryptoList.selectedCurrency);
  const { darkMode } = useSelector((state) => state.settings);
  const allCryptos = useSelector((state) => state.cryptos.allCryptos);
  const { selectedTransaction } = useSelector((state) => state.portfolio);

  const hide500 = useMediaQuery('(max-width:600px)');

  return (
    <Container disableGutters sx={{ borderRadius: '10px', height: '100%', width: '100%' }}>
      <Container sx={{
        display: 'flex', marginBottom: 2, marginTop: 1, justifyContent: 'center', width: '100%',
      }}
      >
        <HistoryIcon sx={{ color: 'secondary.dark' }} /><Typography sx={{ fontWeight: 'bold', color: 'primaryTextColor.main' }}>Token Transfert History</Typography>
      </Container>
      <Container sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflowY: 'auto',
        justifyContent: 'center',
        padding: '0',
      }}
      >
        {transactions.length > 0 ? <HistoryTable transactions={transactions} darkMode={darkMode} allCryptos={allCryptos} refCurrency={refCurrency} /> : (
          <Skeleton
            sx={{
              width: { xs: '300px', md: '1200px' }, height: { xs: '83px', md: '200px' }, borderRadius: '10px', marginBottom: 2,
            }}
            variant="rectangle"
          />
        )}
      </Container>

      <Dialog fullScreen={!!hide500} PaperProps={{ style: { borderRadius: '10px' } }} sx={{ margin: 0, padding: 0, backdropColor: 'background.default' }} open={transactionEditorIsOpen} onClose={() => dispatch(toggleTransactionEditor())}>
        <DialogTitle sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'secondary.dark',
        }}
        >
          Transactions
          <IconButton edge="end" aria-label="Fermer" onClick={() => dispatch(toggleTransactionEditor())}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ margin: 0, padding: 0, backgroundColor: 'background.default' }}>
          <TransactionCreator id={selectedTransaction} transaction={transactions.find((e) => e.id === selectedTransaction)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
}
