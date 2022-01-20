import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { useState } from 'react';

// const style = makeStyles({
//   width: 300,
//   height: 300,
//   backgroundColor: 'primary.dark',
//   '&:hover': {
//     backgroundColor: 'primary.main',
//     opacity: [0.9, 0.8, 0.7],
//   },
// })

export default function Login() {
  const [open, setOpen] = useState(false)
  console.log(open)
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
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
            />
            <TextField
              margin="dense"
              id="password"
              label="Mot de passe"
              type="password"
              fullWidth
              variant="outlined"
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
