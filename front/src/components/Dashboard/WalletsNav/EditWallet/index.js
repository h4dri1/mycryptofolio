import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';

import { useSelector, useDispatch } from 'react-redux';

import {
  toggleUpdateWalletModal, updateWallet, updateUpdateWalletInput,
} from 'src/actions/portfolio';
import { useEffect } from 'react';

const EditWallet = () => {
  const dispatch = useDispatch();

  const { editWallet, wallet: wallets, selectedWallet } = useSelector((state) => state.portfolio);
  const { toggle, inputText } = editWallet;

  useEffect(() => {
    const currentWallet = wallets.filter((wallet) => selectedWallet === wallet.id);
    if (currentWallet.length > 0) dispatch(updateUpdateWalletInput(currentWallet[0].label));
  }, [selectedWallet]);

  return (
    <Dialog open={toggle} onClose={() => dispatch(toggleUpdateWalletModal())}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', color: 'primary.main' }}>
        Modifier un wallet
        <IconButton edge="end" aria-label="Fermer" onClick={() => dispatch(toggleUpdateWalletModal())}>
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nom
        </DialogContentText>
        <TextField
          margin="dense"
          // id="nom"
          label="Nom du wallet"
          // type="nom"
          fullWidth
          variant="outlined"
          value={inputText}
          onChange={(e) => dispatch(updateUpdateWalletInput(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => dispatch(updateWallet(selectedWallet))}>Modifier</Button>
        <Button variant="contained" onClick={() => dispatch(toggleUpdateWalletModal())}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWallet;
