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

import { PropTypes } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { changeField, existingUserToggle } from 'src/actions/user';
import { toggleLoginModal, setDisplaySnackBar } from 'src/actions/settings';

import {
  Link
} from '@mui/material';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function LoginRegister({ type, handleFormSubmit }) {
  // get the user state
  const {
    nickname, email, password, passwordCheck,
  } = useSelector((state) => state.user);

  // get the main state
  const { loginIsOpen } = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  // handle to open and close login modal
  // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  const handleToggleLoginModal = () => {
    dispatch(toggleLoginModal());
  };
  // Update state on change of fields value
  const handleChange = (e) => {
    dispatch(changeField(e.target.id, e.target.value));
  };

  const handleSubmit = () => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (type === 'register') {
      if (password !== passwordCheck) {
        dispatch(setDisplaySnackBar({ severity: 'error', message: 'Les mots de passe saisis ne sont pas identiques' }));
        return;
      }
      // eslint-disable-next-line no-else-return
      else if (!regex.test(password)) {
        dispatch(setDisplaySnackBar({ severity: 'error', message: 'Votre mot de passe doit avoir une taille d\'au moins 8 charactères et contenir: une lettre majuscule, une lettre minuscule, un chiffre et un charactère spécial' }));
        return;
      }
    }
    dispatch(handleFormSubmit());
  };

  return (
    <>
      <Container>
        <Button onClick={handleToggleLoginModal} variant="contained">Mon compte</Button>
      </Container>
      <Dialog open={loginIsOpen} onClose={handleToggleLoginModal}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          { type === 'login' ? 'Connexion' : 'S\'inscrire' }
          <IconButton edge="end" aria-label="Fermer" onClick={handleToggleLoginModal}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pour accéder aux fonctionnalités avancées,
            { type === 'login' ? ' il faut vous connecter.' : ' il faut vous créer un compte et vous connecter.' }
          </DialogContentText>
          {type === 'register' && (
            <TextField
              // autoFocus
              margin="dense"
              id="nickname"
              label="Pseudo"
              type="text"
              fullWidth
              variant="outlined"
              value={nickname}
              onChange={handleChange}
            />
          )}
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
          {type === 'register' && (
            <TextField
              margin="dense"
              id="passwordCheck"
              label="Confirmer le mot de passe"
              type="password"
              fullWidth
              variant="outlined"
              value={passwordCheck}
              onChange={handleChange}
            />
          )}
        </DialogContent>
        <DialogActions>
        <Link
          sx={{ marginRight: '40px'}}
          component="button"
          variant="body2"
          onClick={() => {
            handleClick();
          }}
        >
          Mot de passe oublié ?
        </Link>
          <Button onClick={() => dispatch(existingUserToggle())}>{ type === 'login' ? 'S\'inscrire' : 'J\'ai déjà un compte' }</Button>
          <Button onClick={handleSubmit} variant="contained">{ type === 'login' ? 'Se connecter' : 'S\'inscrire' }</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

LoginRegister.propTypes = {
  type: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
