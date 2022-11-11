/* eslint-disable react/function-component-definition */
import {
  AppBar, Toolbar, Container, useMediaQuery, Box, Link,
} from '@mui/material';
import { Suspense, lazy } from 'react';

import { useSelector } from 'react-redux';

import Logo from 'src/components/Navbar/Logo';
import { Link as RouterLink } from 'react-router-dom';
import RefCurrency from './RefCurrency';
import ToggleMode from './ToggleMode';

import ConnectWallet from './ConnectWallet';

const Indicators = lazy(() => import('./Indicators'));
const Color = lazy(() => import('./Color'));

function TopBanner() {
  const data = useSelector((state) => state.indicators);
  const hide500 = useMediaQuery('(max-width:600px)');

  const wallet = useSelector((state) => state.wallet);
  const wallets = JSON.parse(localStorage.getItem('wallets'));

  const onClick = async () => {
    import('../../services/switchNetwork')
      .then((module) => module.default(wallet));
  };

  return (
    <AppBar
      position="static"
      sx={{
        justifyContent: 'center', maxHeight: '38px', color: 'black', bgcolor: 'secondary.dark',
      }}
    >
      <Toolbar disableGutters>
        {hide500 && (
          <Link component={RouterLink} to="/">
            <Logo />
          </Link>
        )}
        {!hide500 && <Suspense fallback={<></>}><Indicators data={data} /></Suspense>}
        <Container
          disableGutters
          maxWidth="100%"
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >

          <ConnectWallet wallet={wallet} wallets={wallets} />
          <Box
            onClick={onClick}
            sx={{
              width: 22, height: 22, borderRadius: '50%', marginLeft: 1, cursor: 'pointer',
            }}
            component="img"
            src={
                            Number(wallet.walletNetwork) === 137 ? 'https://cdn-icons-png.flaticon.com/24/7016/7016537.png' : 'https://cdn-icons-png.flaticon.com/24/7016/7016523.png'
                        }
          />
          <RefCurrency />
          {!hide500 && <Suspense fallback={<></>}><Color /></Suspense>}
          <ToggleMode />
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default TopBanner;
