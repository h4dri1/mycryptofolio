// import
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  IconButton,
  Container,
} from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { useDispatch, useSelector } from 'react-redux';
import { changeField, login } from 'src/actions/user';
import { toggleLoginModal } from 'src/actions/settings';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function Login() {
  // get the user state
  const {
    email,
    password,
  } = useSelector((state) => state.user);

  // get the main state
  const {
    loginIsOpen,
  } = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  // handle to open and close login modal
  // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  const handleToggleLoginModal = () => {
    dispatch(toggleLoginModal());
  };

  // Update state on change of fields value
  const handleChange = (e) => {
    dispatch(changeField(e.target.type, e.target.value));
  };

  const handleSubmit = () => {
    dispatch(login());
  };

  return (
    <>
      <Container>
        <Button onClick={handleToggleLoginModal} variant="contained">Mon compte</Button>
      </Container>
      <Dialog open={loginIsOpen} onClose={handleToggleLoginModal}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Connexion
          <IconButton edge="end" aria-label="Fermer" onClick={handleToggleLoginModal}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
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
          <Button onClick={() => console.log('Coder la fonction d\'inscription')}>S'inscrire</Button>
          <Button onClick={handleSubmit} variant="contained">Se connecter</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
