import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import Logo from 'src/components/Navbar/Logo';
import MyAccount from 'src/components/Navbar/MyAccount';
import SearchCrypto from 'src/components/Navbar/SearchBar/SearchCrypto';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import {  useSelector } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import { useEffect } from 'react';

import {
  AppBar,
  Box,
  Grid,
  Toolbar,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  Link,
  Button,
  useMediaQuery
} from '@mui/material';

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const { homeIcon } = useSelector((state) => state.settings);

  const { darkMode } = useSelector((state) => state.settings);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const hideButton = useMediaQuery('(min-width:900px)');
  const hide1100 = useMediaQuery('(max-width:1100px)');
  const hide500 = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: !darkMode ? '' : '#002F54' }}>
        <Toolbar
          disableGutters
        >
        {!hide500 && <Link component={RouterLink} to="/">
            <Logo />
        </Link>}

          {!hide1100 && <Link component={RouterLink} to="/">
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
            {hideButton && <Button sx={{textTransform: "none" }} color="secondary" startIcon={
              <CurrencyBitcoinIcon sx={{ width: 30, height: 30, color: !darkMode ? 'secondary' : '#07f3d5', ':hover': {color: !darkMode ? 'secondary.dark' : '#0BA794' }}}/>
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
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} color="secondary" startIcon={
            <ColorLensIcon sx={{ width: 30, height: 30, color: !darkMode ? 'secondary' : '#07f3d5', ':hover': {color: !darkMode ? 'secondary.dark' : '#0BA794' }}}/>
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
            to="/"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} color="secondary" startIcon={
            <SavedSearchIcon sx={{ width: 30, height: 30, color: !darkMode ? 'secondary' : '#07f3d5', ':hover': {color: !darkMode ? 'secondary.dark' : '#0BA794' }}}/>
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
            to="/portfolio"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} color="secondary" startIcon={
            <AccountBalanceWalletIcon sx={{ width: 30, height: 30, color: !darkMode ? 'secondary' : '#07f3d5', ':hover': {color: !darkMode ? 'secondary.dark' : '#0BA794' }}}/>
          }>
          <Typography fontSize={'1.2em'}  color="white">Portfolio</Typography>
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
