// import
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { changeField } from 'src/actions/user';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';

export default function Login() {

  // get the user state
  const {
    email,
    password,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Temporary useState hook to test modal opening and closing
  // It'll be superseded by useSelector to get state from reducers
  const [open, setOpen] = useState(false)
  
  // handle to open and close login modal
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  // Update state on change of fields value 
  const handleChange = (e) => {
    dispatch(changeField(e.target.type, e.target.value))
  }

  return (
    <>
      <Button onClick={handleOpen} variant='outlined'>Mon compte</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Connexion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour accéder au fonctionnalités avancées, il faut vous connecter.
            </DialogContentText>
            <TextField
              // autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>S'inscrire</Button>
            <Button onClick={handleClose} variant='contained'>Se connecter</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
