import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

import Logo from 'src/components/Navbar/Logo';
import MyAccount from 'src/components/Navbar/MyAccount';
import SearchCrypto from 'src/components/Navbar/SearchBar/SearchCrypto';

import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

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

  return (
    <Grid sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ mt: 4.8 }}>
        <Toolbar
          disableGutters
        >
          <Link component={RouterLink} to="/">
            <Logo />
          </Link>

          <Link component={RouterLink} to="/">
            <Typography
              variant="h5"
              noWrap
              color="white"
              component="h1"
              sx={{ display: { xs: 'none', sm: 'flex' }, ml: 1 }}
            >
              MyCryptoFolio
            </Typography>
            <Typography
              variant="subtitle"
              noWrap
              color="white"
              sx={{ display: { xs: 'none', sm: 'flex' }, ml: 1 }}
            >
              Suivez la performance de vos portefeuilles crypto
            </Typography>
          </Link>

          <Link
            component={RouterLink}
            to="/portfolio"
            sx={{ color: 'white', ml: 10 }}
          >
            <Typography
              variant="h7"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block', ml: 3 } }}
            >
              Portfolio
            </Typography>
          </Link>

          <SearchCrypto sx={{ color: 'white', ml: 10 }} />
          <Box sx={{ flexGrow: 1 }} />
          <MyAccount />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Grid >
  );
}
