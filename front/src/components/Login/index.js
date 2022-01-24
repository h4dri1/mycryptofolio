// import
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { changeField, login } from 'src/actions/user';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function Login() {

  // get the user state
  const {
    email,
    password,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Temporary useState hook to test modal opening and closing
  // It'll be superseded by useSelector to get state from reducers
  const [displayModal, setDisplayModal] = useState(false)
  const [displaySnackBar, setDisplaySnackBar] = useState(false)

  // Update state on change of fields value 
  const handleChange = (e) => {
    dispatch(changeField(e.target.type, e.target.value))
  }

  const handleSubmit = () => {
    dispatch(login())
  }

  return (
    <>
      <Button onClick={() => setDisplayModal(true)} variant='outlined'>Mon compte</Button>
      <Dialog open={displayModal} onClose={() => setDisplayModal(false)}>
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
          <Snackbar open={displaySnackBar} autoHideDuration={6000}>
            <Alert severity="success" onClose={() => setDisplaySnackBar(false)}>
              This is a success message!
            </Alert>
          </Snackbar>
          <DialogActions>
            <Button onClick={() => setDisplaySnackBar(true)}>S'inscrire</Button>
            <Button onClick={handleSubmit} variant='contained'>Se connecter</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
