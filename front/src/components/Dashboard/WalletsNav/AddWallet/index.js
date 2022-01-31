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

import { toggleCreateWalletModal, updateCreateWalletInput, createNewWallet } from 'src/actions/portfolio';

const AddWallet = () => {
  const { toggle, inputText } = useSelector((state) => state.portfolio.createWallet);

  const dispatch = useDispatch();

  return (
    <Dialog open={toggle} onClose={() => dispatch(toggleCreateWalletModal())}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', color: 'primary.main' }}>
        Créer un wallet
        <IconButton edge="end" aria-label="Fermer" onClick={() => dispatch(toggleCreateWalletModal())}>
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
          onChange={(e) => dispatch(updateCreateWalletInput(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => dispatch(createNewWallet())}>Créer</Button>
        <Button variant="contained" onClick={() => dispatch(toggleCreateWalletModal())}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWallet;
