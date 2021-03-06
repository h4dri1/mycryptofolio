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
  InputAdornment,
  Typography,
  Avatar
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';

import VisibilityOff from '@mui/icons-material/VisibilityOff';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { PropTypes } from 'prop-types';

import { setPending } from 'src/actions/settings';

import { useDispatch, useSelector } from 'react-redux';
import { changeField, existingUserToggle } from 'src/actions/user';
import { toggleLoginModal, setDisplaySnackBar } from 'src/actions/settings';
import { useState } from 'react';
import Box from '@mui/material/Box';

import Loading from '../Loading';

import { useMediaQuery } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import {
  Link
} from '@mui/material';

import axios from 'axios';

import Identicon from '../Identicon';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function LoginRegister({ type, handleFormSubmit }) {
  // get the user state
  const {
    nickname, email, password, passwordCheck,
  } = useSelector((state) => state.user);

  const baseURL = `${process.env.PRIVATE_API_BASE_URL}`;

  const [ forgotPassword, setForgotPassword ] = useState(false);

  // get the main state
  const { loginIsOpen } = useSelector((state) => state.settings);

  const [ showPass, setShowPass ] = useState(false);

  const [ showPassCheck, setShowPassCheck ] = useState(false);

  const { darkMode } = useSelector((state) => state.settings);

  const { walletAddress, walletBalance } = useSelector((state) => state.connectWallet);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  }

  const handleClickShowCheckPassword = () => {
    setShowPassCheck(!showPassCheck);
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  }

  const handleClick = () => {
    setForgotPassword(true);
  }

  // handle to open and close login modal
  // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  const handleToggleLoginModal = () => {
    setForgotPassword(false);
    dispatch(toggleLoginModal());
  };
  // Update state on change of fields value
  const handleChange = (e) => {
    dispatch(changeField(e.target.id, e.target.value));
  };

  const handleToogleClick = () => {
    setForgotPassword(false);
    dispatch(existingUserToggle())
  }

  const handleSubmit = () => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (type === 'register') {
      if (password !== passwordCheck) {
        dispatch(setDisplaySnackBar({ severity: 'error', message: 'Les mots de passe saisis ne sont pas identiques' }));
        return;
      }
      // eslint-disable-next-line no-else-return
      else if (!regex.test(password)) {
        dispatch(setDisplaySnackBar({ severity: 'error', message: 'Votre mot de passe doit avoir une taille d\'au moins 8 charact??res et contenir: une lettre majuscule, une lettre minuscule, un chiffre et un charact??re sp??cial' }));
        return;
      }
    }
    if (!forgotPassword) {
      if (location.pathname.split('/')[1] === 'reset') {
        navigate('/');
      }
      dispatch(handleFormSubmit());
    } else {
      dispatch(setPending());
      axios({
        method: 'post',
        baseURL,
        url: '/jwt/login/forgot',
        data: {
          email: email
        }
      })
        .then((res) => {
          if (res.status === 201) {
            setForgotPassword(false);
            dispatch(setPending());
            dispatch(setDisplaySnackBar({ severity: 'success', message: 'Un email vous a ??t?? envoy?? pour r??initialiser votre mot de passe' }));
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          dispatch(setPending());
          dispatch(setDisplaySnackBar({ severity: 'error', message: err.response.data.message }));
        });
      }
    }

    const hide500 = useMediaQuery('(max-width:600px)');  
    
  return (
    <Box>
      <Container>
        {walletAddress !== 'Wallet' && <Box onClick={handleToggleLoginModal} sx={{ aligItems: 'center', justifyContent: 'center', display: {xs: 'none', md: 'flex'}, borderRadius: '50%', width: 56, height: 56, boxShadow: 10, bgcolor: !darkMode ? 'secondary.main' : '#07f3d5' }}>
          <Identicon address={walletAddress} diam={56}></Identicon>
        </Box>}
        {walletAddress === 'Wallet' && <Avatar
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggleLoginModal}
            sx={{ display: {xs: 'none', md: 'flex'}, width: 56, height: 56, boxShadow: 10, bgcolor: !darkMode ? 'secondary.main' : '#07f3d5' }}
        />
    }
        <MenuIcon onClick={handleToggleLoginModal} sx={{display: {xs: 'block', md: 'none'}}}></MenuIcon>
      </Container>
      <Dialog fullScreen={hide500 ? true : false} open={loginIsOpen} onClose={handleToggleLoginModal}>
        <Loading />
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: !darkMode ? 'white' : '#002F54' }}>
          { type === 'login' ? 'Connexion' : 'S\'inscrire' }
          <IconButton edge="end" aria-label="Fermer" onClick={handleToggleLoginModal}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{backgroundColor: !darkMode ? 'white' : '#002F54'}}>
          {!forgotPassword && <DialogContentText>
            Pour acc??der aux fonctionnalit??s avanc??es,
            { type === 'login' ? ' il faut vous connecter.' : ' il faut vous cr??er un compte et vous connecter.' }
          </DialogContentText>}
          { forgotPassword && <DialogContentText>
            Renseignez votre adresse mail
          </DialogContentText>}
          {type === 'register' && !forgotPassword && (
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
              color={!darkMode ? 'secondary' : 'custom'}
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
            color={!darkMode ? 'secondary' : 'custom'}
          />
          {!forgotPassword && 
            <TextField
            margin="dense"
            id="password"
            label="Mot de passe"
            type={showPass ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={handleChange}
            color={!darkMode ? 'secondary' : 'custom'}
            InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
              )
            }}
          />
          }
          {type === 'register' && !forgotPassword && (
            <TextField
              margin="dense"
              id="passwordCheck"
              label="Confirmer le mot de passe"
              type={showPassCheck ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={passwordCheck}
              onChange={handleChange}
              color={!darkMode ? 'secondary' : 'custom'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCheckPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                  )
                }}
            />
          )}
          <Link
            sx={{ width: '100%', color: !darkMode ? '' : '#07f3d5'}}
            component="button"
            variant="body2"
            onClick={() => {
              handleClick();
            }}
          >
            Mot de passe oubli?? ?
          </Link>
        </DialogContent>
        <DialogActions sx={{display: 'flex', flexDirection: {xs: 'column', md: 'row'}, backgroundColor: !darkMode ? 'white' : '#002F54'}} >
          <Box sx={{width: '100%', display: 'flex', justifyContent: {xs: 'space-around', md: 'end'}, height: '100%', alignContent: 'center'}}>
            {!forgotPassword && (<Button sx={{':hover': {
                bgcolor: !darkMode ? '' : '#00244F',
                color: !darkMode ? '' : 'white',
              },
              color: !darkMode ? '' : 'primary.dark', backgroundColor: !darkMode ? '' : '#07f3d5',
              marginRight: {xs: 0, md: 2},
              maxHeight: '50px',
              width: '140px'
            }}
              onClick={handleToogleClick}><Typography sx={{fontSize: '0.8em'}}>{ type === 'login' ? 'S\'inscrire' : 'J\'ai d??j?? un compte' }</Typography>
            </Button>)}
            {!forgotPassword && (<Button 
              sx={{':hover': {
                bgcolor: !darkMode ? '' : '#00244F', 
                color: !darkMode ? '' : 'white',
              },
              color: !darkMode ? '' : 'primary.dark', backgroundColor: !darkMode ? '' : '#07f3d5',
              maxHeight: '50px',
              width: '140px'
              }}
              onClick={handleSubmit} 
              variant="contained"><Typography sx={{fontSize: '0.8em'}}>{ type === 'login' ? 'Se connecter' : 'S\'inscrire' }</Typography>
            </Button>)}
          </Box>
          {forgotPassword && (<Button 
            sx={{':hover': {
              bgcolor: !darkMode ? '' : '#00244F',
              color: !darkMode ? '' : 'white',
            },
            color: !darkMode ? '' : 'primary.dark', backgroundColor: !darkMode ? '' : '#07f3d5'}} 
            onClick={handleSubmit} 
            variant="contained">Envoyer
          </Button>)}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

LoginRegister.propTypes = {
  type: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
