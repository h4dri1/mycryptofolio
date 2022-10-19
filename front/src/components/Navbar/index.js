import Logo from 'src/components/Navbar/Logo';
import MyAccount from 'src/components/Navbar/MyAccount';
import SearchCrypto from 'src/components/Navbar/SearchBar/SearchCrypto';
import { Link as RouterLink } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
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
  useMediaQuery,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuItem,
  MenuList,
  ListItemIcon
} from '@mui/material';

export default function PrimarySearchAppBar() {

  const { homeIcon } = useSelector((state) => state.settings);
  const { walletAddress } = useSelector((state) => state.wallet);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const hideButton = useMediaQuery('(min-width:900px)');
  const hide1100 = useMediaQuery('(max-width:1100px)');
  const hide500 = useMediaQuery('(max-width:600px)');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
    else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

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
          {hideButton && <Button onClick={handleToggle} sx={{textTransform: "none", ml: 5 }} startIcon={
            <AccountBalanceWalletIcon sx={{ width: 30, height: 30, color: 'secondary.main', ':hover': {color: 'secondary.dark' }}}/>
          }>
            
          <Typography fontSize={'1.2em'} ref={anchorRef} color="white">Wallet</Typography>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            sx={{width: {xs: '100%', md: '80px'}, zIndex: 99999, position: 'sticky'}}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'bottom' : 'top',
                }}
              >
                <Paper sx={{marginTop: {xs: 4, md: 3}, backgroundColor: 'secondary.light', boxShadow: 4, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList                       
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem sx={{display: 'flex', justifyContent: 'center'}}>
                        <Link
                          component={RouterLink}
                          to="/portfolio"
                          underline="none"
                        >
                          Portfolio
                        </Link>
                      </MenuItem>
                      <MenuItem sx={{display: 'flex', justifyContent: 'center'}}>
                        <Link
                          component={RouterLink}
                          to="/wallet"
                          underline="none"
                        >
                          Wallet
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
          </Button>}
          {!hideButton && <AccountBalanceWalletIcon 
            onClick={handleToggle}
            sx={{ width: 25, height: 25 }} 
            color="primary.light"/>}
          <Box sx={{ flexGrow: 1 }} />
          <SearchCrypto/>
          <MyAccount />
        </Toolbar>
      </AppBar>
    </Box >
  );
}
