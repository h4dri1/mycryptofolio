// import
import { useDispatch, useSelector } from 'react-redux';

import { changeField, login } from 'src/actions/user';
import { toggleLoginModal } from '../../actions';

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

  // get the main state
  const {
    loginIsOpen
  } = useSelector((state) => state.main);
  console.log(loginIsOpen);

  const dispatch = useDispatch();
  
  // handle to open and close login modal
  // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  const handleToggleLoginModal = () => {
    dispatch(toggleLoginModal());
  }

  // Update state on change of fields value 
  const handleChange = (e) => {
    dispatch(changeField(e.target.type, e.target.value))
  }

  const handleSubmit = () => {
    dispatch(login())
  }

  return (
    <>
      <Button onClick={handleToggleLoginModal} variant='outlined'>Mon compte</Button>
      <Dialog open={loginIsOpen} onClose={handleToggleLoginModal}>
        <DialogTitle>Connexion</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour accéder aux fonctionnalités avancées, il faut vous connecter.
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
            <Button onClick={handleToggleLoginModal}>S'inscrire</Button>
            <Button onClick={handleSubmit} variant='contained'>Se connecter</Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
