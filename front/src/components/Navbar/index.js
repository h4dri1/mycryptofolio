import Logo from 'src/components/Navbar/Logo';
import MyAccount from 'src/components/Navbar/MyAccount';
import SearchCrypto from 'src/components/Navbar/SearchBar/SearchCrypto';
import { Link as RouterLink } from 'react-router-dom';

import {  useSelector } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  Button,
  useMediaQuery
} from '@mui/material';

export default function PrimarySearchAppBar() {

  const { homeIcon } = useSelector((state) => state.settings);
  const { walletAddress } = useSelector((state) => state.wallet);

  const hideButton = useMediaQuery('(min-width:900px)');
  const hide1100 = useMediaQuery('(max-width:1100px)');
  const hide500 = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar
          disableGutters
        >
        {!hide500 && <Link component={RouterLink} to="/">
            <Logo />
        </Link>}

          {!hide1100 && <Link underline='none' component={RouterLink} to="/">
            <Typography
              noWrap
              color="white"
              component="h1"
              sx={{ fontSize: '2xl', ml: 1.5 }}
            >
              MyCryptoFolio
            </Typography>
          </Link>}
          <Box sx={{ flexGrow: 1 }} />
          {homeIcon && 
            <Link
              component={RouterLink}
              to="/market"
              underline="none"
              sx={{ color: 'white'}}
            >
            {hideButton && <Button sx={{textTransform: "none" }} startIcon={
              <CurrencyBitcoinIcon sx={{ width: 30, height: 30, color: 'secondary.main', ':hover': {color: 'secondary.dark' }}}/>
            }>
            <Typography fontSize={'1.2em'}  color="white">Cryptocurrencies</Typography>
            </Button>}
            {!hideButton && <CurrencyBitcoinIcon
              sx={{ width: 25, height: 25, ml: 1, mr: 1}} 
              color="primary.light"/>}
            </Link>
          }
          {homeIcon && 
          <Link
            component={RouterLink}
            to="/nft"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} startIcon={
            <ColorLensIcon sx={{ width: 30, height: 30, color: 'secondary.main', ':hover': {color: 'secondary.dark' }}}/>
          }>
          <Typography fontSize={'1.2em'}  color="white">NFT</Typography>
          </Button>}
          {!hideButton && <ColorLensIcon 
            sx={{ width: 25, height: 25, mr: 1 }} 
            color="primary.light"/>}

          </Link>
          }
          {homeIcon && 
          <Link
            component={RouterLink}
            to="/watchlist"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} startIcon={
            <SavedSearchIcon sx={{ width: 30, height: 30, color: 'secondary.main', ':hover': {color: 'secondary.dark' }}}/>
          }>
          <Typography fontSize={'1.2em'}  color="white">Watchlist</Typography>
          </Button>}
          {!hideButton && <SavedSearchIcon 
            sx={{ width: 25, height: 25, mr: 1 }} 
            color="primary.light"/>}
          </Link>
          }
          {homeIcon && 
          <Link
            component={RouterLink}
            to={walletAddress !== 'Wallet' ? "/wallet" : "/portfolio"}
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} startIcon={
            <AccountBalanceWalletIcon sx={{ width: 30, height: 30, color: 'secondary.main', ':hover': {color: 'secondary.dark' }}}/>
          }>
          <Typography fontSize={'1.2em'}  color="white">{walletAddress !== 'Wallet' ? 'Wallet' : 'Portfolio'}</Typography>
          </Button>}
          {!hideButton && <AccountBalanceWalletIcon 
            sx={{ width: 25, height: 25 }} 
            color="primary.light"/>}
          </Link>
          }
          <Box sx={{ flexGrow: 1 }} />
          <SearchCrypto/>
          <MyAccount />
        </Toolbar>
      </AppBar>
    </Box >
  );
}
