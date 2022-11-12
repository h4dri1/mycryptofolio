import MyAccount from 'src/components/Navbar/MyAccount';
import SearchCrypto from 'src/components/Navbar/SearchBar/SearchCrypto';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  useRef, useState, useEffect,
} from 'react';

import { useSelector } from 'react-redux';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Home } from '@mui/icons-material';

import {
  AppBar,
  Box,
  Toolbar,
  Link,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuItem,
  MenuList,
} from '@mui/material';

export default function NavbarMobile() {
  const { homeIcon } = useSelector((state) => state.settings);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const location = useLocation();

  const selectedMenu = () => {
    const path = location.pathname.split('/')[1];
    switch (path) {
      case 'market':
        return 'Market';
      case 'portfolio':
        return 'Portfolio';
      case 'wallet':
        return 'Portfolio';
      case 'watchlist':
        return 'Watchlist';
      case '':
        return 'Home';
      case 'nft':
        return 'NFT';
      default:
        return 'Home';
    }
  };

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
          <Box sx={{ flexGrow: 1 }} />
          {homeIcon
            && (
            <>
              <Link
                component={RouterLink}
                to="/"
                underline="none"
                sx={{ color: 'white', mt: { xs: 1, md: 0 } }}
              >
                <Home
                  sx={{
                    width: 25, height: 25, ml: 1, mr: 0,
                  }}
                  color={selectedMenu() === 'Home' ? 'secondary' : 'white'}
                />
              </Link>
              <Link
                component={RouterLink}
                to="/market"
                underline="none"
                sx={{ color: 'white', mt: { xs: 1, md: 0 } }}
              >
                <CurrencyBitcoinIcon
                  sx={{
                    width: 25, height: 25, ml: 1, mr: 1,
                  }}
                  color={selectedMenu() === 'Market' ? 'secondary' : 'white'}
                />
              </Link>
              <Link
                component={RouterLink}
                to="/nft"
                underline="none"
                sx={{ color: 'white', mt: { xs: 1, md: 0 } }}
              >
                <ColorLensIcon
                  sx={{ width: 25, height: 25, mr: 1 }}
                  color={selectedMenu() === 'NFT' ? 'secondary' : 'white'}
                />
              </Link>
              <Link
                component={RouterLink}
                to="/watchlist"
                underline="none"
                sx={{ color: 'white', mt: { xs: 1, md: 0 } }}
              >
                <SavedSearchIcon
                  sx={{ width: 25, height: 25, mr: 1 }}
                  color={selectedMenu() === 'Watchlist' ? 'secondary' : 'white'}
                />
              </Link>
              <>
                <AccountBalanceWalletIcon
                  onClick={handleToggle}
                  ref={anchorRef}
                  sx={{ width: 25, height: 25 }}
                  color={selectedMenu() === 'Portfolio' ? 'secondary' : 'white'}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-end"
                  transition
                  disablePortal
                  sx={{ width: { xs: '100%', md: '80px' }, zIndex: 99999, position: 'sticky' }}
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin: placement === 'bottom-start' ? 'bottom' : 'top',
                      }}
                    >
                      <Paper sx={{
                        marginTop: { xs: 4, md: 3 }, backgroundColor: 'secondary.light', boxShadow: 4, borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px',
                      }}
                      >
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Link
                                component={RouterLink}
                                to="/portfolio"
                                underline="none"
                              >
                                Portfolio
                              </Link>
                            </MenuItem>
                            <MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
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
              </>
            </>
            )}
          <SearchCrypto />
          <MyAccount />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
