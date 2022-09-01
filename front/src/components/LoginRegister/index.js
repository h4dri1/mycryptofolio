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

import { useDispatch, useSelector } from 'react-redux';
import { changeField, existingUserToggle } from 'src/actions/user';
import { toggleLoginModal, setDisplaySnackBar } from 'src/actions/settings';
import { useState } from 'react';
import Box from '@mui/material/Box';

import { useMediaQuery } from '@mui/material'

import { useLocation, useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

import {
  Link
} from '@mui/material';

import axios from 'axios';

import Identicon from '../Identicon';

import React, { Suspense, lazy } from 'react';

//import Modal from './modal'
const Modal = lazy(() => import('./modal'));

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function LoginRegister({ type, handleFormSubmit }) {
  // get the user state

  const { darkMode } = useSelector((state) => state.settings);

  const { walletAddress } = useSelector((state) => state.wallet);

  const { loginIsOpen } = useSelector((state) => state.settings);

  const dispatch = useDispatch();
  const [ forgotPassword, setForgotPassword ] = useState(false);

  // handle to open and close login modal
  // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  const handleToggleLoginModal = () => {
    setForgotPassword(false);
    dispatch(toggleLoginModal());
  };
  // Update state on change of fields value
  
    
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
      { loginIsOpen && (
          <Suspense fallback={<div>Loading...</div>}>
          <Modal type={type} handleFormSubmit={handleFormSubmit} />
          </Suspense>
        )
      }

    </Box>
  );
}

LoginRegister.propTypes = {
  type: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
