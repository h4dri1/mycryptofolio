// import
import {
  Container,
  useMediaQuery,
  Box,
} from '@mui/material';

import { PropTypes } from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginModal } from 'src/actions/settings';

import { Suspense, lazy } from 'react';

const Modal = lazy(() => import('./modal'));
const Identicon = lazy(() => import('../Identicon'));
const Avatar = lazy(() => import('@mui/material/Avatar'));
const MenuIcon = lazy(() => import('@mui/icons-material/Menu'));

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

export default function LoginRegister({ type, handleFormSubmit }) {
  // get the user state

  const { walletAddress } = useSelector((state) => state.wallet);

  const { loginIsOpen } = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const hide500 = useMediaQuery('(max-width:600px)');

  // handle to open and close login modal
  // TODO: @Gregory-Tannier : to transfer this handle to "Mon Compte" Button in MyAccount component
  const handleToggleLoginModal = () => {
    dispatch(toggleLoginModal(true));
  };
  // Update state on change of fields value

  return (
    <Box>
      <Container>
        {walletAddress !== 'Wallet' && !hide500 && (
        <Box
          onClick={handleToggleLoginModal}
          sx={{
            aligItems: 'center', justifyContent: 'center', display: { xs: 'none', md: 'flex' }, borderRadius: '50%', width: 56, height: 56, boxShadow: 10, bgcolor: 'secondary.main',
          }}
        >
          <Suspense fallback={<></>}><Identicon address={walletAddress} diam={56} /></Suspense>
        </Box>
        )}
        {walletAddress === 'Wallet' && !hide500 && (
        <Suspense fallback={<></>}><Avatar
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggleLoginModal}
          sx={{
            display: { xs: 'none', md: 'flex' }, width: 56, height: 56, boxShadow: 10, bgcolor: 'secondary.main',
          }}
        />
        </Suspense>
        )}
        {hide500 && <Suspense fallback={<></>}><MenuIcon onClick={handleToggleLoginModal} sx={{ display: { xs: 'block', md: 'none' } }} /></Suspense>}
      </Container>
      { loginIsOpen && (
      <Suspense fallback={<></>}>
        <Modal type={type} handleFormSubmit={handleFormSubmit} />
      </Suspense>
      )}

    </Box>
  );
}

LoginRegister.propTypes = {
  type: PropTypes.string.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
