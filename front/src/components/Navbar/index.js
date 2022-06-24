import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import Logo from 'src/components/Navbar/Logo';
import MyAccount from 'src/components/Navbar/MyAccount';
import SearchCrypto from 'src/components/Navbar/SearchBar/SearchCrypto';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ColorLensIcon from '@mui/icons-material/ColorLens';

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

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* Once connected to MyCryptoFolio: */}
      <MenuItem onClick={handleMenuClose}>Portfolio</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    />
  );

  const hideButton = useMediaQuery('(min-width:900px)');
  const hide1100 = useMediaQuery('(max-width:1100px)');
  const hide500 = useMediaQuery('(max-width:600px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ mt: 4.8 }}>
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
          <Link
            component={RouterLink}
            to="/market"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none" }} color="secondary" startIcon={<CurrencyBitcoinIcon sx={{ width: 30, height: 30 }} color="secondary"/>}>
            <Typography fontSize={'1.2em'}  color="white">Cryptocurrencies</Typography>
          </Button>}
          {!hideButton && <CurrencyBitcoinIcon 
            sx={{ width: 30, height: 30, ml: 1, mr: 1 }} 
            color="primary.light"/>}

          </Link>
          <Link
            component={RouterLink}
            to="/nft"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} color="secondary" startIcon={<ColorLensIcon sx={{ width: 30, height: 30 }} color="secondary"/>}>
            <Typography fontSize={'1.2em'}  color="white">NFT</Typography>
          </Button>}
          {!hideButton && <ColorLensIcon 
            sx={{ width: 30, height: 30, mr: 1 }} 
            color="primary.light"/>}

          </Link>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} color="secondary" startIcon={<SavedSearchIcon sx={{ width: 30, height: 30 }} color="secondary"/>}>
            <Typography fontSize={'1.2em'}  color="white">Watchlist</Typography>
          </Button>}
          {!hideButton && <SavedSearchIcon 
            sx={{ width: 30, height: 30, mr: 1 }} 
            color="primary.light"/>}
          </Link>
          <Link
            component={RouterLink}
            to="/portfolio"
            underline="none"
            sx={{ color: 'white'}}
          >
          {hideButton && <Button sx={{textTransform: "none", ml: 5 }} color="secondary" startIcon={<AccountBalanceWalletIcon sx={{ width: 30, height: 30 }} color="secondary"/>}>
            <Typography fontSize={'1.2em'}  color="white">Portfolio</Typography>
          </Button>}
          {!hideButton && <AccountBalanceWalletIcon 
            sx={{ width: 30, height: 30 }} 
            color="primary.light"/>}
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <SearchCrypto />
          <MyAccount />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box >
  );
}
