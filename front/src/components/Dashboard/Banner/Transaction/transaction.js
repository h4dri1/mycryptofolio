import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import TransactionCreator from 'src/components/Dashboard/TransactionCreator';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function DialogBox(props) {
  const { hide500, transactionCreatorIsOpen, transactionPanel } = props;

  const handleClose = () => transactionPanel();

  return (
    <Dialog fullScreen={hide500} PaperProps={{ style: { borderRadius: '10px' } }} sx={{ margin: 0, padding: 0, backdropColor: 'background.default' }} open={transactionCreatorIsOpen} onClose={handleClose}>
      <DialogTitle sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'secondary.dark',
      }}
      >
        Transactions
        <IconButton edge="end" aria-label="Fermer" onClick={handleClose}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ margin: 0, padding: 0, backgroundColor: 'background.default' }}>
        <TransactionCreator disabled={false} />
      </DialogContent>
    </Dialog>
  );
}
