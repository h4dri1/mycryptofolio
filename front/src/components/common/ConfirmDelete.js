import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { deleteTransaction, deleteWallet } from 'src/actions/portfolio';
import { toggleConfirmDelete } from 'src/actions/settings';

const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const { toggle, type, itemId } = useSelector((state) => state.settings.deleteItem);

  return (
    <Dialog PaperProps={{style: { borderRadius: '10px' }}} open={toggle} onClose={() => dispatch(toggleConfirmDelete())}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', color: 'white', backgroundColor: 'secondary.dark' }}>
        Confirmer la suppression
        <IconButton edge="end" aria-label="Fermer" onClick={() => dispatch(toggleConfirmDelete())}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{backgroundColor: 'background.default'}}>
        <DialogContentText sx={{mt: 2}}>
          Êtes-vous sûr de vouloir supprimer {type === 'wallet' ? `ce ${type}` : `cette ${type}`} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{backgroundColor: 'background.default'}}>
        <Button
          variant="contained"
          onClick={() => dispatch(type === 'wallet' ? deleteWallet(itemId) : deleteTransaction(itemId))}
        >Supprimer
        </Button>
        <Button variant="contained" onClick={() => dispatch(toggleConfirmDelete())}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;
