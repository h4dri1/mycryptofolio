import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';

const AddPortfolio = () => {
  console.log('toto');

  return (
    <Dialog open>  {/* open={loginIsOpen} onClose={handleToggleLoginModal} */}
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Créer un portfolio
        <IconButton edge="end" aria-label="Fermer"> {/* onClick={handleToggleLoginModal} */}
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nom du portfolio
        </DialogContentText>
        <TextField
          margin="dense"
            // id="nom"
          label="Nom"
            // type="nom"
          fullWidth
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Créer</Button> {/* onClick={handleSubmit} */}
      </DialogActions>
    </Dialog>
  );
};

export default AddPortfolio;
