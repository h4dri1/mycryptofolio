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

import { toggleCreatePortfolioModal, updateCreatePortfolioInput, createNewPortfolio } from 'src/actions/portfolio';

const AddPortfolio = () => {
  const { toggle, inputText } = useSelector((state) => state.portfolio.createPortfolio);

  const dispatch = useDispatch();

  return (
    <Dialog open={toggle} onClose={() => dispatch(toggleCreatePortfolioModal())}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        Créer un portfolio
        <IconButton edge="end" aria-label="Fermer" onClick={() => dispatch(toggleCreatePortfolioModal())}>
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
          label="Nom du portfolio"
            // type="nom"
          fullWidth
          variant="outlined"
          value={inputText}
          onChange={(e) => dispatch(updateCreatePortfolioInput(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => dispatch(createNewPortfolio())}>Créer</Button>
        <Button variant="contained" onClick={() => dispatch(toggleCreatePortfolioModal())}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPortfolio;
